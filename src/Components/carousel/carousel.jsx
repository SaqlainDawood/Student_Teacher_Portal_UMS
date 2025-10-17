import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

import HEDGOP from '../../assets/Caruosel/HEDGOP.jpg';
import HigherEducation from '../../assets/Caruosel/Higher Education Commissioner.jpg';
import PBC from '../../assets/Caruosel/PBC.jpg';
import PCOP from '../../assets/Caruosel/PCOP.jpg';
import PNMW from '../../assets/Caruosel/PNMW.jpg';

const Carousel = () => {
  const cards = [
    { id: 1, img: HEDGOP, alt: 'HEDGOP' },
    { id: 2, img: HigherEducation, alt: 'HigherEducation' },
    { id: 3, img: PBC, alt: 'PBC' },
    { id: 4, img: PCOP, alt: 'PCOP' },
    { id: 5, img: PNMW, alt: 'PNMW' },
  ];

  return (
    <div className="p-6">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 0, // delay 0 = continuous scroll
          disableOnInteraction: false,
        }}
        speed={3000} // adjust speed (ms)
      >
        {cards.map(card => (
          <SwiperSlide key={card.id}>
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img src={card.img} alt={card.alt} className="w-full h-40 object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
