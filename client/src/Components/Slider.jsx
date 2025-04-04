import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
//import "swiper/css";
import "swiper/swiper.css";
//import "../assets/css/swiper.css";
import "../assests/css/swiperStyles.css";
//import "swiper/css/bundle";
import "swiper/swiper-bundle.css";
//import "../assets/css/swiper-bundle.min.css";
import { useSelector } from 'react-redux';
import {SliderCard} from "../Components";

const Slider = () => {
  const products = useSelector((state) =>state.products);
  const [fruits, setFruits] = useState(null);
  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
    //console.log(fruits);
  }, [products]);

  useEffect(() => {
    console.log(fruits);
  }, [fruits]);


  return (
    <div className="w-full pt-24">
       <Swiper
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
       {fruits && 
       fruits.map((data,i)=>(
         <SwiperSlide key={i}>
         <SliderCard key={i} data={data} index={i}/>
         </SwiperSlide>
       ))}
        
      </Swiper>
    </div>
  )
}

export default Slider
