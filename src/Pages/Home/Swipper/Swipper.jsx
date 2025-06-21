 import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import icon from '../../../../src/assets/customer-top.png';
import { SiComma } from "react-icons/si";

const testimonials = [
  {
    name: "Awlad Hossin",
    title: "Senior Product Designer",
    quote:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Nasir Uddin",
    title: "CEO",
    quote:
      "Posture correction products help improve mobility and reduce long-term discomfort by supporting the body naturally.",
  },
  {
    name: "Rasel Ahamed",
    title: "CTO",
    quote:
      "The right posture device enables proper alignment and supports better breathing and confidence throughout your day.",
  },
];

const Swipper = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src={icon} alt="Illustration" className="h-26" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          What our customers are saying
        </h2>
        <p className="text-gray-600 mb-10">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro.
          Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          followFinger={true}
          className="pb-10"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white p-8 rounded-xl shadow-md max-w-xl mx-auto text-left">
                <div className="text-4xl text-gray-300 flex my-2"><SiComma /><SiComma /></div>
                <p className="text-gray-700 mb-6">{t.quote}</p>
                <hr className="border-dashed border-gray-300 mb-4" />
                <div className="flex gap-4">
                               <div className="h-10 w-10 rounded-full bg-[#03373D]">
                    
                    </div> 
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Swipper;