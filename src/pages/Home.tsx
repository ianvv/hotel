import React from "react";
import { Link } from "react-router-dom";

import Hero from "../Components/uikit/Hero/Hero";
import Banner from "../Components/uikit/Banner/Banner";
import Services from "../Components/Services/Services";
import FeaturedRooms from "../Components/FeaturedRooms/FeaturedRooms";
import s from "../assets/styles/commonStyles.module.scss";

const Home: React.FC = () => {
  return (
    <>
      <Hero>
        <Banner
          title="luxurious rooms"
          subtitle="deluxe rooms starting at $225"
        >
          <Link to="/rooms" className={s.buttonPrimary}>
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
  );
};

export default Home;
