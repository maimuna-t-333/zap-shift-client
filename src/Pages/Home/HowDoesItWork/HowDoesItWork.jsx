import React from "react";
import icon from '../../../../src/assets/bookingIcon.png'

const features = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const HowDoesItWork = () => {
  return (
    <section className="my-10 bg-gray-100 py-12 px-4 md:px-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">How it Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-primary mb-4">
              <img src={icon} alt="" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 ">
              {feature.title}
            </h3>
            <p className="text-gray-600  text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowDoesItWork;
