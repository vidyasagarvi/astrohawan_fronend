import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import banner_1 from '../../assets/mahakumbh.png';
import banner_2 from '../../assets/banner_2.jpeg';
import HomePage from '../HomePage';

function Home() {
  const searchParams = new URLSearchParams(location.search);
  const language = searchParams.get('lang') || 'en';
  return (
    <div>
      <div className="py-2 mb-5 hero-header">
        <div className="col-md-12 col-lg-12">
          {/* Carousel with fade effect */}
          <div id="carouselId" className="carousel slide carousel-fade position-relative" data-bs-ride="carousel">
            
            {/* Carousel inner items */}
            <div className="carousel-inner" role="listbox">
            <Link to={`/makakumbh?lang=${language}`}> <div className="carousel-item active">
             <img src={banner_1} className="img-fluid w-100 h-100 bg-secondary" alt="Puja Store" />
             
              </div>
              </Link>
              <div className="carousel-item">
                <img src={banner_2} className="img-fluid w-100 h-100" alt="Puja Store" />
              </div>
            </div>

            {/* Previous Button */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>

            {/* Next Button */}
            <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <HomePage />
    </div>
  );
}

export default Home;
