import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import FeaturedDestinations from "../Components/FeaturedDestinations";
import { useLOData } from "../Context/LocalDataContext";
import HandpickedTrips from "../Components/HandpickedTrips";

const Homepage = () => {
  const { localData } = useLOData();

  return (
    <div>
      <Header />
      <Hero />
      <FeaturedDestinations />
      <HandpickedTrips />
    </div>
  );
};

export default Homepage;
