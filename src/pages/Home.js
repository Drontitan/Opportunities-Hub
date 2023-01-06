import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import OpportunitySection from "../components/Opprotunityection";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import FeatureOpportunitys from "../components/FeatureOpportunity";
import Trending from "../components/Trending";
import Search from "../components/Search";
import { isEmpty, isNull } from "lodash";
import { useLocation } from "react-router-dom";
import Category from "../components/Category";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ setActive, user, active }) => {
  const [loading, setLoading] = useState(true);
  const [Opportunitys, setOpportunitys] = useState([]);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [trendOpportunitys, setTrendOpportunitys] = useState([]);
  const [totalOpportunitys, setTotalOpportunitys] = useState(null);
  const [hide, setHide] = useState(false);
  const queryString = useQuery();
  const searchQuery = queryString.get("searchQuery");
  const location = useLocation();

  const getTrendingOpportunitys = async () => {
    const OpportunityRef = collection(db, "blogs");
    const trendQuery = query(OpportunityRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendOpportunitys = [];
    querySnapshot.forEach((doc) => {
      trendOpportunitys.push({ id: doc.id, ...doc.data() });
    });
    setTrendOpportunitys(trendOpportunitys);
  };

  useEffect(() => {
    getTrendingOpportunitys();
    setSearch("");
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setTotalOpportunitys(list);
        // setOpportunitys(list);
        setInterval(() => {
          setLoading(false);
        }, 1000);
   
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      getTrendingOpportunitys();
    };
  }, [setActive, active]);

  useEffect(() => {
    getOpportunitys();
    setHide(false);
  }, [active]);

  const getOpportunitys = async () => {
    const OpportunityRef = collection(db, "blogs");
    console.log(OpportunityRef);
    const firstFour = query(OpportunityRef, orderBy("timestamp","desc"), limit(4));
    const docSnapshot = await getDocs(firstFour);
    setOpportunitys(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
  };

  console.log("Opportunitys", Opportunitys);

  const updateState = (docSnapshot) => {
    const isCollectionEmpty = docSnapshot.size === 0;
    if (!isCollectionEmpty) {
      const OpportunitysData = docSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOpportunitys((Opportunitys) => [...Opportunitys, ...OpportunitysData]);
      setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    } else {
      toast.info("No more Opportunity to display");
      setHide(true);
    }
  };

  const fetchMore = async () => {
    setLoading(true);
    const OpportunityRef = collection(db, "blogs");
    const nextFour = query(
      OpportunityRef,
      orderBy("title"),
      limit(4),
      startAfter(lastVisible)
    );
    const docSnapshot = await getDocs(nextFour);
    updateState(docSnapshot);
      setLoading(false);
   
  };

  const searchOpportunitys = async () => {
    const OpportunityRef = collection(db, "blogs");
    const searchTitleQuery = query(OpportunityRef, where("title", "==", searchQuery));
    const searchTagQuery = query(
      OpportunityRef,
      where("tags", "array-contains", searchQuery)
    );
    const titleSnapshot = await getDocs(searchTitleQuery);
    const tagSnapshot = await getDocs(searchTagQuery);

    let searchTitleOpportunitys = [];
    let searchTagOpportunitys = [];
    titleSnapshot.forEach((doc) => {
      searchTitleOpportunitys.push({ id: doc.id, ...doc.data() });
    });
    tagSnapshot.forEach((doc) => {
      searchTagOpportunitys.push({ id: doc.id, ...doc.data() });
    });
    const combinedSearchOpportunitys = searchTitleOpportunitys.concat(searchTagOpportunitys);
    setOpportunitys(combinedSearchOpportunitys);
    setHide(true);
    setActive("");
  };

  useEffect(() => {
    if (!isNull(searchQuery)) {
      searchOpportunitys();
    }
  }, [searchQuery]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that Opportunity ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Opportunity deleted successfully");
        
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      console.log("test");
      getOpportunitys();
      setHide(false);
    }
    setSearch(value);
  };

  // category count
  const counts = totalOpportunitys.reduce((prevValue, currentValue) => {
    let name = currentValue.category;
    if (!prevValue.hasOwnProperty(name)) {
      prevValue[name] = 0;
    }
    prevValue[name]++;
    // delete prevValue["undefined"];
    return prevValue;
  }, {});

  const categoryCount = Object.keys(counts).map((k) => {
    return {
      category: k,
      count: counts[k],
    };
  });

  console.log("categoryCount", categoryCount);

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="">
        <div className="row">
          <Trending Opportunitys={trendOpportunitys} loading={loading} />
          <div className="col-md-8">
            <div className="Opportunity-heading text-start py-2 mb-4">Daily Opportunitys</div>
            {Opportunitys.length === 0 && location.pathname !== "/" && (
              <>
                <h4>
                  No Opportunity found with search keyword:{" "}
                  <strong>{searchQuery}</strong>
                </h4>
              </>
            )}
            {Opportunitys?.map((Opportunity) => (
              <OpportunitySection
                key={Opportunity.id}
                user={user}
                handleDelete={handleDelete}
                {...Opportunity}
              />
            ))}

            {!hide && (
              <button className="btn btn-primary" onClick={fetchMore}>
                Load More
              </button>
            )}
          </div>
          <div className="col-md-3">
            <Search search={search} handleChange={handleChange} />
            <div className="Opportunity-heading text-start py-2 mb-4">Tags</div>
            <Tags tags={tags} />
            <FeatureOpportunitys title={"Most Popular"} Opportunitys={Opportunitys} loading={loading} />
            <Category catgOpportunitysCount={categoryCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
