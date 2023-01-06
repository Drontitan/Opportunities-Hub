import {
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Opportunityection from "../components/Opprotunityection";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { db } from "../firebase";

const Opportunity = ({setActive}) => {
  const [loading, setLoading] = useState(false);
  const [Opportunity, setOpportunity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [noOfPages, setNoOfPages] = useState(null);
  const [count, setCount] = useState(null);

  useEffect(() => {
    getOpportunityData();
    getTotalOpportunity();
    setActive("Opportunity");
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const getOpportunityData = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const first = query(blogRef, orderBy("title"), limit(4));
    const docSnapshot = await getDocs(first);
    setOpportunity(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setCount(docSnapshot.size);
    setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1]);
    setLoading(false);
  };

  const getTotalOpportunity = async () => {
    const blogRef = collection(db, "blogs");
    const docSnapshot = await getDocs(blogRef);
    const totalOpportunity = docSnapshot.size;
    const totalPage = Math.ceil(totalOpportunity / 4);
    setNoOfPages(totalPage);
  };

  const fetchMore = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const nextOpportunityQuery = query(
      blogRef,
      orderBy("title"),
      startAfter(lastVisible),
      limit(4)
    );
    const nextOpportunitySnaphot = await getDocs(nextOpportunityQuery);
    setOpportunity(
      nextOpportunitySnaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(nextOpportunitySnaphot.size);
    setLastVisible(nextOpportunitySnaphot.docs[nextOpportunitySnaphot.docs.length - 1]);
    setLoading(false);
  };
  const fetchPrev = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const end =
      noOfPages !== currentPage ? endAt(lastVisible) : endBefore(lastVisible);
    const limitData =
      noOfPages !== currentPage
        ? limit(4)
        : count <= 4 && noOfPages % 2 === 0
        ? limit(4)
        : limitToLast(4);
    const prevOpportunityQuery = query(blogRef, orderBy("title"), end, limitData);
    const prevOpportunitySnaphot = await getDocs(prevOpportunityQuery);
    setOpportunity(
      prevOpportunitySnaphot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setCount(prevOpportunitySnaphot.size);
    setLastVisible(prevOpportunitySnaphot.docs[prevOpportunitySnaphot.docs.length - 1]);
    setLoading(false);
  };

  const handlePageChange = (value) => {
    if (value === "Next") {
      setCurrentPage((page) => page + 1);
      fetchMore();
    } else if (value === "Prev") {
      setCurrentPage((page) => page - 1);
      fetchPrev();
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="blog-heading text-center py-2 mb-4">Daily Opportunity</div>
          {Opportunity?.map((blog) => (
            <div className="col-md-6 oppotunities-adjustment" key={blog.id}>
              <Opportunityection {...blog} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          noOfPages={noOfPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Opportunity;
