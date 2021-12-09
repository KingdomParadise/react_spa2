import React, { useEffect, useState } from "react";
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
  const [later, setLater] = useState(false);
  if (error) console.log(`Error! ${error.message}`);
  useEffect(()=>{
    if (!loading){
      console.log(bet)
    }
  }, [loading, bet]);

  useEffect(()=> {
    setLater(sessionStorage.getItem('connect_later'));
  }, [])

  const checkAuth = () => {
    setLater(sessionStorage.getItem('connect_later'));
  }

  if (!later && (!account || chainId !== 56)) {
    return <Auth laterFn={()=>setLater(true)}/>
  } else {
    return (
      <div
        // data-aos="fade-out"
        // data-aos-delay="200"
        className="bg-dark-700"
      >
        <Layout>
          <HeroSection checkAuth={checkAuth}/>
          <div className="py-20 bg-dark-700 bottom-section">
            {account && chainId === 56 &&<PrevGameSection />}
            <LeaderBoard />
          </div>
        </Layout>
      </div>
    );
  }
};

export default Home;
