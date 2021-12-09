/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState, useCallback } from "react";
import Logo from "../../assets/images/LOGO_DESKTOP.png";
import MobileLogo from "../../assets/images/LOGO_MOBILE.png";
import Hamburger from "../../assets/images/Hamburgur.png";
import User from "../../assets/images/USER.png";
import Languages from "../../assets/images/LANGUAGES.png";
import Metamask from "../../assets/images/METAMASK.png";
import Bnb from "../../assets/images/BNB.png";
import Custom_dollor from "../../assets/images/CUSTOM_DOLLOR.png";
import Star from "../../assets/images/STAR.png";
import Marbles from "../../assets/images/MARBLES.png";
import CountUp from "react-countup";
import "./style.css";
import { useWeb3React } from "@web3-react/core";
import SelectWalletModal from "../modals/SelectWalletModal";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { injected, walletConnect } from "../../hooks/wallet/Connectors";
import IercAbi from "../../assets/abi/erc20.json";
import PancakeAbi from "../../assets/abi/pancakeAbi.json";

const Index = ({checkAuth}) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [eqxBalance, setEqxBalance] = useState(0);
  const { connector, account, chainId, activate, library} = useWeb3React();
  const [sqmBalance, setSqmBalance] = useState(0.00);
  const [sqmRate, setSqmRate] = useState(0);
  const sqmAddr = "0x2766cc2537538ac68816b6b5a393fa978a4a8931";
  const pancakeAddr = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
<<<<<<< HEAD
=======
  // const bnbAddr = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
>>>>>>> 8d78f6724abfb73a7f5ec2386e4fd8676cebc5cc
  const usdtAddr = "0x55d398326f99059fF775485246999027B3197955";

  const getBalance = useCallback(async () => {
    try {
      if (account) {
          let sqmContract = await new library.eth.Contract(IercAbi, sqmAddr);
          let sqmBln = await sqmContract.methods.balanceOf(account).call();
          setSqmBalance(sqmBln);
          let balance = await library.eth.getBalance(account);
          setEqxBalance(await library.utils.fromWei(balance, "ether"));
      }

    } catch (error) {
      console.log("error", error)
    }
  }, [account, library]);

  const setSqmRatePancake = useCallback(async () => {
      let sqmContract = await new library.eth.Contract(IercAbi, sqmAddr);
      let sqmDecimal = await sqmContract.methods.decimals().call();
      let router = await new library.eth.Contract(PancakeAbi, pancakeAddr);
      let tokenToSell = 1 * 10**sqmDecimal;
      let amountOutSqmToUsdt = await router.methods.getAmountsOut(tokenToSell.toString(), [sqmAddr, usdtAddr]).call();
      amountOutSqmToUsdt = await library.utils.fromWei(amountOutSqmToUsdt[1].toString());
      setSqmRate(amountOutSqmToUsdt);
  }, [library])

  console.log(connector, account);
  const handleChange = (event) => {
    setOpen((prev) => !prev);
  };

  const metaMaskConnect = async () => {
    try {
      await activate(injected);
    }
    catch (e) {
      console.error(e);

    }
  };

  const resetWalletConnector = (connector) => {
    if (
      connector &&
      connector instanceof WalletConnectConnector
    ) {
      connector.walletConnectProvider = undefined
    }
  }

  const walletConnector = async () => {
    try {
      await activate(walletConnect);
      resetWalletConnector(walletConnect);
    }
    catch (e) {
      console.error(e);
    }
  }

  let menuRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      await setSqmRatePancake();
      await getBalance();
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
    fetchData();
  }, [chainId, account, getBalance, setSqmRatePancake]);
  return (
    <header className=" text-white bg-dark-700 lg:bg-transparent pb-10 lg:pb-0">
      <div className="container">
        <div className="py-8 flex justify-between items-center">
          <div>
            <picture>
              <source srcSet={Logo} media="(min-width: 1024px)" />
              <img src={MobileLogo} alt="" />
            </picture>
          </div>
          {account && chainId === 56 &&
            <>
            <div className="metamask-mobile flex lg:hidden items-center">
              <div className="mr-4">
                <img src={Metamask} alt="" />
              </div>
              <p className="text-sm">{account ? account.slice(0, 5) : ''}...{account ? account.slice(-5) : ''}</p>
            </div>
            <div className="bg-dark-400 p-2 pr-8 rounded-full hidden items-center  lg:flex">
              <div className="metamask flex items-center">
                <div className="mr-4">
                  <img src={Metamask} alt="" />
                </div>
                <p className="text-sm">{account ? account.slice(0, 5) : ''}...{account ? account.slice(-5) : ''}</p>
              </div>
              <div className="flex items-center ml-4">
                <div className="mr-4">
                  <img src={Bnb} alt="" />
                </div>
                <p className="text-base  font-medium">{(parseFloat(eqxBalance)).toFixed(4)} BNB</p>
              </div>
              <div className="flex items-center ml-4">
                <div className="mr-4">
                  <img src={Custom_dollor} alt="" />
                </div>
                <p className="text-base font-medium">{(parseFloat(sqmBalance)).toFixed(2)} SQM</p>
                <p className="text-sm  text-gray-500 ml-2 font-normal">${((parseFloat(sqmBalance * sqmRate))).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
              </div>
              <div className="flex items-center ml-4">
                <div className="mr-4">
                  <img src={Star} alt="" />
                </div>
                <p className="text-base font-medium">Rank 23</p>
                <p className="text-sm  text-gray-500 ml-2 font-normal">
                  Est. Payout 2032
                </p>
              </div>
            </div>
            </>
          }
          {(!account || chainId !== 56) && 
            <button className="connect-wallet-btn" onClick={()=>{
              if (account) {
                sessionStorage.removeItem('connect_later');
                checkAuth();
              } else {
                setShow(true);
              }
              
            }}>Connect wallet</button>
          }
          <div className="lg:hidden">
            <button onClick={handleChange}>
              <img src={Hamburger} alt="" />
            </button>
          </div>
          <div className="hidden lg:flex flex-shrink-0 items-center ">
            {/*<img src={Music} alt="" className="w-8 " />*/}
            <ol class="equaliser">
              <li class="equaliser-bar"></li>
              <li class="equaliser-bar"></li>
              <li class="equaliser-bar"></li>
              <li class="equaliser-bar"></li>
            </ol>
            <div className="w-8 mx-4">
              <img src={Languages} alt="languages" className="w-full " />
            </div>
            <img src={User} alt="USER" className="w-10" />
          </div>
        </div>
        <div className="  w-full  mx-auto  block lg:hidden">
          <h1 className="font-mineCraft text-3xl md:text-4xl mx-auto text-center text-yellow my-8">
            <span className="minecraft-dollor">S</span>{" "}
            <CountUp end={200000} duration={2} separator=',' /> USD IN PRIZES
          </h1>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`menu flex flex-col ${open ? "active" : ""} `}
      >
        <div className="flex-1">
          <div className="pb-10 text-right">
            <button className="p-2" onClick={handleChange}>
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
          <div className="metamask flex items-center max-w-max">
            <div className="mr-4">
              <img src={Metamask} alt="" />
            </div>
            <p className="text-sm">0x71C...8976F</p>
          </div>
          <div className="flex items-center py-3">
            <div className="mr-4">
              <img src={Bnb} alt="" />
            </div>
            <p className="text-base  font-medium">1.2921 BNB</p>
          </div>
          <div className="flex items-center py-3">
            <div className="mr-4">
              <img src={Custom_dollor} alt="" />
            </div>
            <p className="text-base font-medium">7,721 SQM</p>
            <p className="text-sm  text-gray-500 ml-2 font-normal">$51,263</p>
          </div>
          <div className="flex items-center py-3">
            <div className="  px-2 mr-4">
              <img src={Star} alt="" />
            </div>
            <p className="text-base font-medium">Rank 23</p>
            <p className="text-sm  text-gray-500 ml-2 font-normal">
              Score 2032
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex items-center  w-full my-10 md:my-4">
            <div
              className=" cursor-pointer marble-popup-parent relative"
            // onClick={marbleHandler}
            >
              <div className="marbles-question">
                <i className="fas fa-question"></i>
              </div>
              <img src={Marbles} alt="" />
            </div>
            <p className="font-medium text-2xl ml-3">Marbles</p>
          </div>
          <h1 className="font-mineCraft text-3xl md:text-4xl mx-auto  text-yellow my-8">
            <span className="minecraft-dollor">S</span>{" "}
            <CountUp end={200000} duration={2} separator=','/> USD IN PRIZES
          </h1>
          <div className="flex items-center menu-social">
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-telegram-plane"></i>
            </a>
          </div>
        </div>
      </div>
      <div className={`overlay ${open ? "block" : "hidden"}`}></div>
      <SelectWalletModal modalShow={show} setModalView={setShow} metamask={metaMaskConnect} walletconnect={walletConnector} />
    </header>
  );
};

export default Index;
