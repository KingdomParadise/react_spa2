import React from "react";
import Logo from "../../assets/images/LOGO_DESKTOP.png";
import User from "../../assets/images/USER.png";
import Languages from "../../assets/images/LANGUAGES.png";
import Music from "../../assets/images/MUSIC.png";
import Metamask from "../../assets/images/METAMASK.png";
import Bnb from "../../assets/images/BNB.png";
import Custom_dollor from "../../assets/images/CUSTOM_DOLLOR.png";
import Star from "../../assets/images/STAR.png";

import "./style.css";
const Index = () => {
  return (
    <header className=" text-white">
      <div className="container py-8 flex justify-between items-center">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className="bg-dark-400 p-2 pr-8 rounded-full flex items-center">
          <div className="metamask flex items-center">
            <div className="mr-4">
              <img src={Metamask} alt="" />
            </div>
            <p className="text-sm">0x71C...8976F</p>
          </div>
          <div className="flex items-center ml-4">
            <div className="mr-4">
              <img src={Bnb} alt="" />
            </div>
            <p className="text-base  font-medium">1.2921 BNB</p>
          </div>
          <div className="flex items-center ml-4">
            <div className="mr-4">
              <img src={Custom_dollor} alt="" />
            </div>
            <p className="text-base font-medium">7,721 SQM</p>
            <p className="text-sm  text-gray-500 ml-2 font-normal">$51,263</p>
          </div>
          <div className="flex items-center ml-4">
            <div className="mr-4">
              <img src={Star} alt="" />
            </div>
            <p className="text-base font-medium">Rank 23</p>
            <p className="text-sm  text-gray-500 ml-2 font-normal">
              Score 2032
            </p>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center">
          <img src={Music} alt="" className="w-8 " />
          <div className="w-8 mx-4">
            <img src={Languages} alt="languages" className="w-full " />
          </div>
          <img src={User} alt="USER" className="w-10" />
        </div>
      </div>
    </header>
  );
};

export default Index;
