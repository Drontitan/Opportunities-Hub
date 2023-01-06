import React from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const FeatureOpportunitys = ({ Opportunitys, title ,loading }) => {
 
  const navigate = useNavigate();
   
  return (
    <div>
      <div className="blog-heading text-start pt-3 py-2 mb-4">{title}</div>
      {/* {Opportunitys?.map((item) => (
        <div
          className="row pb-3"
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <div className="col-5 align-self-center">
            <img
              src={item.imgUrl}
              alt={item.title}
              className="most-popular-img"
            />
          </div>
          <div className="col-7 padding">
            <div className="text-start most-popular-font">{item.title}</div>
            <div className="text-start most-popular-font-meta">
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>
        </div>
      ))} */}
      {Opportunitys?.map((item) => (
          <div    key={item.id}
          style={{ cursor: "pointer" }} onClick={() => navigate(`/detail/${item.id}`)} class="Popular">
        <div class="card-left">
          <div class="card-image">
            <img  src={item.imgUrl}
              alt={item.title}/>
          </div>
          <div class="card-text">
          <div className="col-7 padding">
            <div className="text-start most-popular-font">{item.title}</div>
            <div className="text-start most-popular-font-meta">
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>
          </div>
        </div>
</div>
 ))}
    </div>
  );
};

export default FeatureOpportunitys;
