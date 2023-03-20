import React from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Spinner from "./Spinner";

const Trending = ({ Opportunitys ,loading }) => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
 
  return (
    <>
      {/* <div>
        <div className="blog-heading text-start py-2 mb-4">Trending</div>
      </div>
      <OwlCarousel className="owl-theme" {...options}>
        {Opportunitys?.map((item) => (
          <div className="item px-2" key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <div className="trending-img-position">
                <div className="trending-img-size">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="trending-img-relative"
                  />
                </div>
                <div className="trending-img-absolute"></div>
                <div className="trending-img-absolute-1">
                  <span className="text-white">{item.title}</span>
                  <div className="trending-meta-info">
                    {item.author} - {item.timestamp.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </OwlCarousel> */}
    <div className="trending-opportunities">
    <section className="popular">
   
 
    <section className="popular-card">
      <h1>Popular<br/> This<br/> Month</h1>
    </section>

  

   <section className="cards">
   {Opportunitys?.map((item) => (
    
     <article key={item.id} className="card">
        
         <header className="card-header">
           <p className="date-published">
            <div className="publishdate">
            <span className="date-published-prefix">Article</span>
              <span>{item.timestamp.toDate().toDateString()}</span>
              </div>
                    </p>
                    <Link to={`/detail/${item.id}`}>
           <h2 className="card-title"><a >{item.title}</a></h2>
           </Link>
                </header>
         

           <div className="card-body">

    
                    <div className="card-author">

       
                        <a href="#" className="author-avatar">
                            <img src={item.imgUrl} alt=""/>
                        </a>

          
                        <div className="author-name">
                            <div className="author-name-prefix">Author</div>
                           <div style={{color:"#7a7a8b"}}>{item.author}</div>
                        </div>

                
                        <svg className="half-circle" viewBox="0 0 106 57">
                            <defs>
                                <linearGradient id="gradient" x1="25%" y1="25%" x2="75%" y2="75%">
                                    <stop offset="25%" stop-color="#ff8a00" />
                                    <stop offset="75%" stop-color="#e52e71" />
                                </linearGradient>
                            </defs>
                            <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                        </svg>
                    </div>
        
                </div>
     </article>
   ))}
   
   </section>

</section>
</div>
      
    </>
  );
};



export default Trending;
