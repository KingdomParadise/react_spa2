/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import GreenTag from "../../assets/images/GreenTag.png";
import RedTag from "../../assets/images/RedTag.png";
import Winner1 from "../../assets/images/winner1.png";
import Winner2 from "../../assets/images/winner2.png";
import Winner3 from "../../assets/images/winner3.png";
import Dollor from "../../assets/images/dollor.svg";
import Dollor2 from "../../assets/images/Dollor2.png";
import Dollor3 from "../../assets/images/Dollor3.png";
import Dollor4 from "../../assets/images/Dollor4.png";
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_PLAYERS } from "../../utils/queries";
import { useWeb3React } from "@web3-react/core";
import { ethers } from 'ethers';
import Abi from "../../assets/abi/squidabi.json";

import "./style.css";

/*const data = [
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
  {
    account: "0x8Df64...0E3dEB7F7B6",
    score: 1039,
    payout: 5_536,
  },
];*/

const PrevGame = () => {
  const [currentView, setCurrentView] = useState(10);
  const [data, setData] = useState([]);
  const [endDate, setEndDate] = useState('');
  const { account } = useWeb3React();
  const [me, setMe] = useState({rewardClaimed: 0, score: 0});
  const { loading: playersQueryLoading, data: players } = useQuery(QUERY_PLAYERS, { variables: { orderBy: 'score' } });
  const { loading: playerQueryLoading, data: player } = useQuery(QUERY_ME, { variables: { id: account } });
  const address = "0x430f41E878303550769dE5b430c4F98a9289aB3B";

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(address, Abi, signer);
    const end = await contract.end();
    setEndDate(end);
  }

  const getEndDate = () => {
    const currDate = Math.floor(Date.now()/1000);
    const cd = 24 * 60 * 60;
    const ch = 60 * 60;
    const t = endDate-currDate;
    const d = Math.floor(t / cd);
    const h = Math.floor(t / ch);
    return d ? `${d} days` : `${h} hours`;
  }

  useEffect(()=>{
    if (!playersQueryLoading && players) {
      setData(players.players);
    }
    getContract();
  }, [playersQueryLoading, players]);

  useEffect(()=>{
    if (!playerQueryLoading && player && player.player) {
      setMe(player.player);
    }
  }, [playerQueryLoading, player]);
  
  return (
    <section className="leader-board py-20">
      <div className="container text-center">
        <h1>Leaderboard</h1>
        <div className="leader-head text-center relative mt-10">
          <div className="score-tag">
            <div className="relative ">
              <img src={GreenTag} alt="" />
              <div className="score-tag-content text-black">
                <h3 className=" text-base md:text-xl font-bold">Top 8%</h3>
                <p className=" text-xs md:text-sm">Winner</p>
              </div>
            </div>
            <div className="ml-4 relative ">
              <img src={RedTag} alt="" />
              <div className="score-tag-content">
                <h3 className="text-base md:text-xl font-bold">{me.score}</h3>
                <p className="text-xs md:text-sm">Your score</p>
              </div>
            </div>
          </div>
          <h2 className="font-mineCraft text-4xl md:text-6xl uppercase leading-10">
            200,000 usd in prizes
          </h2>
          <p className="text-yellow text-base  md:text-2xl mt-4">
            {getEndDate()} untill the winners announced
          </p>
        </div>

        <div className="hidden md:grid grid-cols-12 w-full mt-28 uppercase font-bold text-sm px-4">
          <div className="text-left col-span-7">
            <p>Rank</p>
          </div>
          <div className="flex justify-between col-span-5">
            <p>Score</p>
            <p>Estimated Payout</p>
          </div>
        </div>
        <div className="cards-wrapper mt-20 md:mt-0">
          {data && data.slice(0, currentView).map((v, i) => (
            <div
              key={i}
              className={`ml-1  rounded-3xl grid grid-cols-1 md:grid-cols-12 mt-8 relative winner-card text-brown ${
                i + 1 === 1
                  ? "first py-8"
                  : i + 1 === 2
                  ? "second py-8"
                  : i + 1 === 3
                  ? "third py-8"
                  : "py-6"
              }`}
            >
              <div className="rank-tag  text-left ">
                <div className="rank-tag-inner pl-2 flex items-center">
                  <p className=" font-bold  italic  text-white">
                    <span
                      className={`${
                        i + 1 === 1
                          ? "text-4xl"
                          : i + 1 === 2
                          ? "text-4xl"
                          : i + 1 === 3
                          ? "text-4xl"
                          : "text-xl"
                      } `}
                    >
                      {i + 1}
                    </span>
                    <span>
                      {i + 1 === 1
                        ? "st"
                        : i + 1 === 2
                        ? "nd"
                        : i + 1 === 3
                        ? "rd"
                        : "th"}
                    </span>
                  </p>
                </div>
              </div>
              <div className=" flex  items-center   md:col-span-6 lg:col-span-7 pl-16 md:pl-20">
                <img
                  src={i + 1 === 1 ? Winner1 : i + 1 === 2 ? Winner2 : Winner3}
                  alt=""
                />
                <p className=" ml-4 font-bold text-base sm:text-xl account">
                {v.id ? v.id.slice(0, 5) : ''}...{v.id ? v.id.slice(-9) : ''}
                </p>
              </div>
              <div className="flex mt-8 md:mt-0 md:col-span-6 lg:col-span-5 items-center md:pr-4 max-w-sm  justify-between w-11/12 mx-auto md:mx-auto md:w-full md:max-w-none">
                <div className="md:hidden">
                  <p className=" text-left mb-1 uppercase font-bold text-sm score">
                    <span>Score</span>
                  </p>
                  <p className="text-xl score">
                    <i className="fas fa-star"></i>
                    <span className="inline-block ml-2 font-bold ">
                      {v.score}
                    </span>
                  </p>
                </div>
                <p className="hidden md:block  text-xl score">
                  <i className="fas fa-star"></i>
                  <span className="inline-block ml-2 font-bold ">
                    {v.score}
                  </span>
                </p>
                <div className="md:hidden">
                  <p className=" text-left mb-1 uppercase font-bold text-sm payout">
                    Estimated Payout
                  </p>
                  <p className="text-xl flex items-center justify-end flex-1 payout">
                    <img
                      src={
                        i + 1 === 1
                          ? Dollor
                          : i + 1 === 2
                          ? Dollor2
                          : i + 1 === 3
                          ? Dollor3
                          : Dollor4
                      }
                      alt=""
                    />
                    <span className="inline-block ml-2 font-bold ">
                      ${v.rewardClaimed ? v.rewardClaimed : 0} $SQM
                    </span>
                  </p>
                </div>
                <p className="hidden md:flex text-xl  items-center justify-end flex-1 payout">
                  <img
                    src={
                      i + 1 === 1
                        ? Dollor
                        : i + 1 === 2
                        ? Dollor2
                        : i + 1 === 3
                        ? Dollor3
                        : Dollor4
                    }
                    alt=""
                  />
                  <span className="inline-block ml-2 font-bold ">
                    ${v.rewardClaimed ? v.rewardClaimed : 0} $SQM
                  </span>
                </p>
              </div>
            </div>
          ))}
          {data && data.length > 10 && <div
            className={`cards-wrapper-overlay  ${
              currentView === data.length ? "hidden" : "flex"
            } items-end justify-center`}
          >
            <button
              className={` flex justify-center items-center`}
              onClick={() => setCurrentView(data.length)}
            >
              <p className="mr-2">See full leaderboard</p>
              <i className="fas fa-arrow-down"></i>
            </button>
          </div>
          }
        </div>
      </div>
    </section>
  );
};

export default PrevGame;
