/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Header } from "../../components";
import Marbles from "../../assets/images/MARBLES.png";
import { TinyDollor, TinyBnb, TinyStar, Thunder } from "../../assets/svg";
import TinyStarImg from "../../assets/images/STAR_TINY.svg";
import TinyStarImgBlack from "../../assets/images/STAR_TINY_BLACK.svg";
import TinyBnbImg from "../../assets/images/BNB_TINY.svg";
import TinyBnbImgBlack from "../../assets/images/BNB_TINY_BLACK.svg";
import TinyDoller2 from "../../assets/images/CUSTOM_DOLLOR_TINY.png";
import TinyDoller2Black from "../../assets/images/CUSTOM_DOLLOR_TINY_BLACK.png";
import GameStartModal from "../../components/modals/GameStartModal";
import WinModal from "../../components/modals/WinModal";
import LostModal from "../../components/modals/LostModal";
import NoMarbleModal from "../../components/modals/NoMarbleModal";
import "./style.css";

const data = [
  {
    bnb: "1 BNB",
    star: "+100",
    dollor: "+$600 SQM",
  },
  {
    bnb: "2 BNB",
    star: "+200",
    dollor: "+$1200 SQM",
  },
  {
    bnb: "3 BNB",
    star: "+300",
    dollor: "+$1800 SQM",
  },
];

const HeroSection = () => {
  const [currentActive, setCurrentActive] = useState(0);
  const [activeGame, setActiveGame] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [lossGame, setLossGame] = useState(false);
  const [noMarbleGame, setNoMarbleGame] = useState(false);

  const gameHandler = () => {
    setActiveGame((prev) => !prev);
  };
  const winHandler = () => {
    setWinGame((prev) => !prev);
  };
  const lossHandler = () => {
    setLossGame((prev) => !prev);
  };
  const noMarbleHandler = () => {
    setNoMarbleGame((prev) => !prev);
  };

  const activeHandler = (i) => {
    setCurrentActive(i);
  };

  const oddHandler = () => {
    setActiveGame((prev) => !prev);
    setTimeout(() => {
      setActiveGame((prev) => !prev);
      setWinGame((prev) => !prev);
    }, 3000);
  };
  const evenHandler = () => {
    setLossGame((prev) => !prev);
    setTimeout(() => {
      setLossGame((prev) => !prev);
      setNoMarbleGame((prev) => !prev);
    }, 3000);
  };

  return (
    <section className="bg-dark-500  min-h-screen pb-14 hero-section">
      <Header />
      <div className="container">
        <div className="mx-auto flex items-center justify-center w-full my-10 md:my-4">
          <div className="relative">
            <div className="marbles-question">
              <i className="fas fa-question"></i>
            </div>
            <img src={Marbles} alt="" />
          </div>
          <p className="font-medium text-2xl ml-3">Marbles</p>
        </div>
        <div>
          <h1 className="font-mineCraft text-4xl mx-auto text-center text-yellow my-8">
            <span className="minecraft-dollor">S</span> 200,000 USD IN PRIZES
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 relative">
          <div className="even" role="button" onClick={evenHandler}>
            <p>Even</p>
          </div>
          <div className="odd" role="button" onClick={oddHandler}>
            <p>Odd</p>
          </div>
          <div className="or hidden md:flex">
            <p className="font-bold text-xl">OR</p>
          </div>
        </div>

        <div className="mt-20  flex lg:items-center lg:justify-between flex-col  lg:flex-row">
          <p className="text-yellow text-2xl font-bold">Select BNb amount</p>
          <div className="grid grid-cols-3 gap-4 items-center justify-between lg:my-0 my-8">
            {data.map((v, i) => (
              <div
                className={`bg-dark-300 py-1 rounded-xl  cursor-pointer relative select-bnb ${
                  currentActive === i ? "active" : ""
                }`}
                key={i}
                onClick={() => activeHandler(i)}
              >
                <div className="tick">
                  <i className="fas fa-check"></i>
                </div>
                <div
                  className={`flex  flex-col md:flex-row md:items-center px-4 py-2  pr-3  border-b  ${
                    currentActive === i
                      ? "border-yellow-400"
                      : "border-dark-400"
                  }`}
                >
                  <img
                    src={currentActive === i ? TinyBnbImgBlack : TinyBnbImg}
                    className="w-6"
                    alt=""
                  />
                  <p className=" mt-2 md:mt-0 md:ml-2 font-medium text-xl">
                    {v.bnb}
                  </p>
                </div>
                <div className="px-4 flex items-center pr-4 py-2">
                  <div className="md:flex items-center hidden ">
                    <img
                      src={currentActive === i ? TinyStarImgBlack : TinyStarImg}
                      alt=""
                    />
                    <p className="text-sm ml-2 font-bold">{v.star}</p>
                  </div>
                  <div className="flex items-center md:ml-3">
                    <img
                      src={currentActive === i ? TinyDoller2Black : TinyDoller2}
                      alt=""
                      className="hidden md:block "
                    />
                    <p className="text-sm md:ml-2 font-bold">{v.dollor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-white flex items-center p-4 lg:py-7 lg:px-6 rounded-xl cursor-pointer justify-center">
            <Thunder /> <p className="ml-2">Enable Quickplay</p>
          </div>
        </div>
      </div>
      <GameStartModal
        activeGame={activeGame}
        setActiveGame={setActiveGame}
        gameHandler={gameHandler}
      />
      <WinModal
        activeGame={winGame}
        setActiveGame={setWinGame}
        gameHandler={winHandler}
      />
      <LostModal
        activeGame={lossGame}
        setActiveGame={setLossGame}
        gameHandler={lossHandler}
      />
      <NoMarbleModal
        activeGame={noMarbleGame}
        setActiveGame={setNoMarbleGame}
        gameHandler={noMarbleHandler}
      />
    </section>
  );
};

export default HeroSection;
