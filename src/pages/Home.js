import React, { useEffect, useCallback } from "react";
import { Layout } from "../components";
import HeroSection from "../sections/HeroSection";
import PrevGameSection from "../sections/PrevGameSection";
import LeaderBoard from "../sections/LeaderBoard";
import Auth from "./../components/auth";
import "./style.css";
import { useQuery } from '@apollo/client';
import { QUERY_BET } from "../utils/queries";
import { useWeb3React } from "@web3-react/core";

const Home = () => {
  const { account, chainId } = useWeb3React();
  const { loading, data: bet, error } = useQuery(QUERY_BET, { variables: { id: '0x03dbf44d15350e9fd1a1046b6022f89ebeb3ac09afdb737f6d58a45ade85d7bc' } });
  if (error) console.log(`Error! ${error.message}`);
  useEffect(()=>{
    if (!loading){
      console.log(bet)
    }
  }, [loading, bet]);

  const isWalletConnected = useCallback(() => {
    return account && chainId.toString() === process.env.REACT_APP_CHAIN_ID;
  },[account, chainId]);

  if (account && chainId.toString() !== process.env.REACT_APP_CHAIN_ID) {
    return <Auth />
  } else {
    return (
      <div
        // data-aos="fade-out"
        // data-aos-delay="200"
        className="bg-dark-700"
      >
        <Layout>
          <HeroSection />
          <div className="py-20 bg-dark-700 bottom-section">
            {isWalletConnected() &&<PrevGameSection />}
            <LeaderBoard />
          </div>
        </Layout>
      </div>
    );
  }
};

export default Home;
