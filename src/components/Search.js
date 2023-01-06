import React from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ search, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="blog-heading text-start py-2 mb-4">Search</div>
      <form  onSubmit={handleSubmit}>
        {/* <button className="btn btn-secondary search-btn">
          <i className="fa fa-search" />
        </button> */}
        <div class="search-box">
                <input type="text"  value={search} placeholder="Search Opportunities"  onChange={handleChange} class="search-txt"/>
                <div class="search-btn">
                <button class="search-btn" >
                        <i class="fa fa-search"></i>
                        </button> 
                </div>
          </div>
      </form>
    </div>
  );
};

export default Search;
