import React from "react";
import { Layout } from "../components";
import HeroSection from "../sections/HeroSection";
import PrevGameSection from "../sections/PrevGameSection";
import LeaderBoard from "../sections/LeaderBoard";

import "./style.css";
const Home = () => {
  return (
    <div data-aos="fade-out" data-aos-delay="200" className="bg-dark-700">
      <Layout>
        <HeroSection />
        <div className="py-20 bg-dark-700 bottom-section">
          <PrevGameSection />
          <LeaderBoard />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
