import React from "react";
import Logo from "../../assets/images/LOGO_DESKTOP.png";
import MobileLogo from "../../assets/images/LOGO_MOBILE.png";
import Hamburger from "../../assets/images/Hamburgur.png";
import User from "../../assets/images/USER.png";
import Languages from "../../assets/images/LANGUAGES.png";
import Music from "../../assets/images/MUSIC.png";
import Metamask from "../../assets/images/METAMASK.png";
import Bnb from "../../assets/images/BNB.png";
import Custom_dollor from "../../assets/images/CUSTOM_DOLLOR.png";
import Star from "../../assets/images/STAR.png";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import "./style.css";
const Index = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <header className=" text-white bg-dark-700 md:bg-transparent pb-10 md:pb-0">
      <div className="container">
        <div className="py-8 flex justify-between items-center">
          <div>
            <picture>
              <source srcSet={Logo} media="(min-width: 1024px)" />
              <img src={MobileLogo} alt="" />
            </picture>
          </div>
          <div className="metamask-mobile flex md:hidden items-center">
            <div className="mr-4">
              <img src={Metamask} alt="" />
            </div>
            <p className="text-sm">0x71C...8976F</p>
          </div>
          <div className="bg-dark-400 p-2 pr-8 rounded-full hidden items-center  md:flex">
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
          <div className="lg:hidden">
            <button>
              <img src={Hamburger} alt="" />
            </button>
          </div>
          <div className="hidden lg:flex flex-shrink-0 items-center ">
            <img src={Music} alt="" className="w-8 " />
            <div className="w-8 mx-4">
              <img src={Languages} alt="languages" className="w-full " />
            </div>
            <img src={User} alt="USER" className="w-10" />
          </div>
        </div>
        <div className=" max-w-xs w-full  mx-auto select block md:hidden">
          <TextField
            id="outlined-select-currency"
            select
            value={value}
            onChange={handleChange}
            fullWidth
            className="text-white "
          >
            <MenuItem value={0}>
              <div className="flex items-center ml-4 text-white">
                <div className="mr-4">
                  <img src={Bnb} alt="" />
                </div>
                <p className="text-base  font-medium">1.2921 BNB</p>
              </div>
            </MenuItem>
            <MenuItem value={1}>
              {" "}
              <div className="flex items-center ml-4 text-white">
                <div className="mr-4">
                  <img src={Custom_dollor} alt="" />
                </div>
                <p className="text-base font-medium">7,721 SQM</p>
                <p className="text-sm  text-gray-500 ml-2 font-normal">
                  $51,263
                </p>
              </div>
            </MenuItem>
            <MenuItem value={2}>
              {" "}
              <div className="flex items-center ml-4 text-white">
                <div className="mr-4">
                  <img src={Star} alt="" />
                </div>
                <p className="text-base font-medium">Rank 23</p>
                <p className="text-sm  text-gray-500 ml-2 font-normal">
                  Score 2032
                </p>
              </div>
            </MenuItem>
          </TextField>
        </div>
      </div>
    </header>
  );
};

export default Index;
