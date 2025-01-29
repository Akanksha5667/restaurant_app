import React from 'react';
import biryaniImage  from'../../assets/biryani.png'
import burgerImage from '../../assets/burger.png'
import pizzaImage2 from '../../assets/pizza2.png'
import SimpleImageSlider from "react-simple-image-slider";

const slideImages = [
    { url: biryaniImage, caption: 'Caption 1' },
    { url: burgerImage, caption: 'Caption 2' },
    { url: pizzaImage2, caption: 'Caption 4' },
  ];
  
  const Slideshow = () => {
    return (
        <div>
      <SimpleImageSlider
        height={500}
        images={slideImages}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
        autoPlayDelay={5}
      />
    </div>
    )
  };

  export default Slideshow;