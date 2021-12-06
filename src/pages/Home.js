import React, { useEffect } from "react";
import { Layout } from "../components";
import HeroSection from "../sections/HeroSection";
import PrevGameSection from "../sections/PrevGameSection";
import LeaderBoard from "../sections/LeaderBoard";

import "./style.css";
import { useQuery } from '@apollo/client';
import { QUERY_BET } from "../utils/queries";

const Home = () => {
  const { loading, data: bet, error } = useQuery(QUERY_BET, { variables: { id: '' } });
  if (error) console.log(`Error! ${error.message}`);
  useEffect(()=>{
    if (!loading){
      console.log(bet, '----');
    }
  }, [loading, bet])
  return (
    <div
      // data-aos="fade-out"
      // data-aos-delay="200"
      className="bg-dark-700"
    >
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
