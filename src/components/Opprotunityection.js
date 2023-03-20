import React, { useEffect } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
const Opportunityection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  likes,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  var count= Object.keys(likes).length;
  return (
    
    <>
    <div className="big-card">
	<div className="container-card">
        <div className="header-container">
          <img src={imgUrl} alt={title} className="header-image" />
          
          <div className="card-container-header">
            <h1 className="main-card-heading">{category}</h1>
            <span className="card-container-tag">Actor</span>
            <span className="card-container-tag">Producer</span>

          </div> 
        </div>
        
        <div className="overlay-header"></div>
        
        <div className="body-container-card">
          <img src="https://s17.postimg.cc/xcbukrwdr/Hugh_Jackman_f.jpg" alt="Hugh Jackman" className="body-image" />
          <div className="body-action-button u-flex-center">
            <svg fill="#ffffff" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </div>
          <span className="body-stats">Views<span>3.5k</span></span>
          <span className="body-stats">Likes<span>* {count}</span></span>
          <div className="u-clearfix"></div>
          
      </div>
      </div>
      <div  className="card-content-adjust">
      <div className="row pb-4" key={id}>

        <div className="col-md-10">
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2">{title}</span>
            <span className="meta-info">
              <p className="author">{author}</p> -&nbsp;
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          <div className="short-description text-start">
            {excerpt(description, 100)}
          </div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          {user && user.uid === userId && (
            <div style={{ float: "right" }}>
              <DeleteIcon
              style={{cursor:"pointer",fontSize:"30px",color:"#cb2025",}}
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <BorderColorIcon
                  style={{cursor:"pointer",fontSize:"30px",color:"#00a096",marginLeft:"2vw"}}
               
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
</div>
    </>
  );
};

export default Opportunityection;
