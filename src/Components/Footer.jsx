import React from 'react';
import logo from '../assets/logo.png';

const FooterSection = ({ title, items }) => (
  <div className="footer-section">
    <h3 className="section-title">{title}</h3>
    <ul className="section-list">
      {items.map((item) => (
        <li key={item}>
          <a href="#" className="footer-link">
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const cities = {
    col1: ['Delhi', 'Pune', 'Jaipur', 'Vadodara'],
    col2: ['Mumbai', 'Kolkata', 'Lucknow', 'Nagpur'],
    col3: ['Bangalore', 'Ahmedabad', 'Indore', 'Kochi'],
    col4: ['Chennai', 'Chandigarh', 'Udaipur', 'Surat'],
    col5: ['Hyderabad', 'Goa', 'Agra', 'Ludhiana']
  };

  const sections = {
    discover: {
      title: 'Discover',
      items: ['Trending Restaurants']
    },
    about: {
      title: 'About',
      items: ['About Us', 'Blog', 'Terms & Conditions', 'Privacy Policy']
    },
    cuisines: {
      title: 'Top Cuisines',
      items: ['Chinese', 'Italian', 'South Indian', 'Bengali', 'Mexican', 'Barbecue']
    },
    facilities: {
      title: 'Top Facilities',
      items: ['Fine Dining', '5 Star', 'Candle Light Dinner']
    },
    locations: {
      title: 'Top Locations',
      items: ['Madhapur', 'Banjara Hills', 'Secunderabad', 'MG Road', 'Gachibowli', 'Jubilee Hills']
    }
  };

  return (
    <footer className="footer">
      <div className="cities-section">
        <h3 className="cities-title">Available in</h3>
        <div className="cities-grid">
          {Object.values(cities).map((cityList, index) => (
            <ul key={index} className="city-list">
              {cityList.map((city) => (
                <li key={city}>
                  <a href="#" className="footer-link">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="main-sections">
        {Object.values(sections).map((section) => (
          <FooterSection 
            key={section.title} 
            title={section.title} 
            items={section.items} 
          />
        ))}
      </div>

      <div className="bottom-section">
        <img 
          src={logo} 
          alt="" 
          className="footer-logo"
        />
        <p className="footer-text">
          Find the best Restaurants, Deals, Discounts & Offers
        </p>
        <p className="footer-text">
          Write to us at: helpdesk@menubox.in
        </p>
        
        {/* <div className="social-icons">
          {['youtube', 'facebook', 'instagram', 'twitter'].map((platform) => (
            <a
              key={platform}
              href={`#${platform}`}
              className="social-icon"
            >
              <span className="sr-only">{platform}</span>
            </a>
          ))}
        </div> */}

        <p className="copyright">
          © 2022 - Menubox All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
