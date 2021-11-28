/* eslint-disable no-unused-vars */
import { Header } from "../../components";
import Marbles from "../../assets/images/MARBLES.png";
import { TinyDollor, TinyBnb, TinyStar, Thunder } from "../../assets/svg";
import TinyDoller2 from "../../assets/images/CUSTOM_DOLLOR_TINY.png";
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
  return (
    <section className="bg-dark-500  min-h-screen pb-14">
      <Header />
      <div className="container ">
        <div className="mx-auto flex items-center justify-center w-full my-4">
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

        <div className="grid grid-cols-2 gap-10 mt-20 relative">
          <div className="even  ">
            <p>Even</p>
          </div>
          <div className="odd">
            <p>Odd</p>
          </div>
          <div className="or">
            <p className="font-bold text-xl">OR</p>
          </div>
        </div>

        <div className="mt-20  flex items-center justify-between">
          <p className="text-yellow text-2xl">Select BNb ammount</p>
          <div className="flex items-center">
            {data.map((v, i) => (
              <div
                className="bg-dark-300 py-1 rounded-xl mr-4 cursor-pointer"
                key={i}
              >
                <div className="flex items-center px-4 py-2  pr-3  border-b border-dark-400">
                  <TinyBnb />
                  <p className="ml-2 font-medium text-xl">{v.bnb}</p>
                </div>
                <div className="px-4 flex items-center pr-4 py-2">
                  <div className="flex items-center">
                    <TinyStar />
                    <p className="text-sm ml-2 font-bold">{v.star}</p>
                  </div>
                  <div className="flex items-center ml-3">
                    <img src={TinyDoller2} alt="" />
                    <p className="text-sm ml-2 font-bold">{v.dollor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-white flex items-center py-7 px-6 rounded-xl cursor-pointer">
            <Thunder /> <p className="ml-2">Enable Quickplay</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
