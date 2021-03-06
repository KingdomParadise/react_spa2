/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
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
import MarbleModal from "../../components/modals/MarbleModal";
import YellowThunder from "../../assets/images/yellow-thunder.png";
import EvenBg from "../../assets/images/EVEN_BG.png";
import EvenBgHover from "../../assets/images/EVEN_BG-HOVER.png";
import OddBg from "../../assets/images/ODD_BG.png";
import OddBgHover from "../../assets/images/ODD_BG-HOVER.png";
import "./style.css";
import CountUp from "react-countup";
import QuickPlayActive from "../../assets/audios/activate-quick-play.mp3";
import QuickPlayDeactivate from "../../assets/audios/deactivate-quick-play.mp3";
import SelectBnb1 from "../../assets/audios/select-bet-1.mp3";
import SelectBnb2 from "../../assets/audios/select-bet-2.mp3";
import SelectBnb3 from "../../assets/audios/select-bet-3.mp3";
import { useWeb3React } from "@web3-react/core";
import Abi from "../../assets/abi/squidabi.json";
import { Link } from "@mui/material";
import { ethers } from 'ethers';

const data = [
  {
    bnb: "1 BNB",
    value: 0.05,
    star: "+100",
    dollor: "+$600 SQM",
  },
  {
    bnb: "2 BNB",
    value: 0.06,
    star: "+200",
    dollor: "+$1200 SQM",
  },
  {
    bnb: "3 BNB",
    value: 0.07,
    star: "+300",
    dollor: "+$1800 SQM",
  },
];

const HeroSection = ({ checkAuth }) => {
  const { account, library, chainId} = useWeb3React();

  const [currentActive, setCurrentActive] = useState(0);
  const [activeGame, setActiveGame] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [lossGame, setLossGame] = useState(false);
  const [noMarbleGame, setNoMarbleGame] = useState(false);
  const [marbleGame, setMarbleGame] = useState(false);
  const [active, setActive] = useState(false);
  const [bnb, setBnb] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const betInput = useMemo(() => { return { betId: "", account: "", bet: "" } }, []);

  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const { Interface } = ethers.utils;

  const address = "0x430f41E878303550769dE5b430c4F98a9289aB3B";

  const quickActive = useRef(null);
  const quickDeactive = useRef(null);
  const bet1 = useRef(null);
  const bet2 = useRef(null);
  const bet3 = useRef(null);

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
  const marbleHandler = () => {
    setMarbleGame((prev) => !prev);
  };

  const activeHandler = (i, v, init = false) => {
    if (!init) {
      if (i === 0) {
        bet1.current.play();
      } else if (i === 1) {
        bet2.current.play();
      } else {
        bet3.current.play();
      }
    }
    setBnb(v);
    setCurrentActive(i);
  };

  const isWalletConnected = useCallback(() => {
    return account && chainId.toString() === process.env.REACT_APP_CHAIN_ID;
  },[account, chainId]);

  const listenEvent = useCallback(async () => {
    let contract = await new library.eth.Contract(Abi, address);

    //error while listening to event
    await contract.events.BetResolved({}).on('data', (data) => {
      console.log('data response', data.returnValues);
      let p = data.returnValues;
      setActiveGame(prev => false);
      if (betInput.betId === p.betId) {
        if (p.result === betInput.bet) {
          setWinGame((prev) => !prev)
        } else if (p.result === 0) {
          setNoMarbleGame((prev) => !prev);
        } else if (p.result === 1) {
          setProcessing(true);
        } else {
          setLossGame((prev) => !prev)
        }
      }
    }).on('changed', (change) => {
      console.log('cahnges', change)
    }).on('error', error => {
      console.log('bet resolved error', error);
      setError(true);
    })
  }, [library, betInput]);

  useEffect(() => {
    async function fetchData() {
      activeHandler(0, data[0].value, true)
      if (isWalletConnected()) {
        await listenEvent();
      }
    }
    fetchData();
  }, [listenEvent, chainId, account, isWalletConnected])


  // etherjs
  const etherHandler = async (value) => {
    try {
      setActiveGame(true)
      let signer = provider.getSigner();
      let contract = new ethers.Contract(address, Abi, signer)
      let SqInterface = new Interface(Abi);

      let bnbValue = ethers.utils.parseEther(bnb.toString());
      let txHash = await contract.placeBet(value,{value: bnbValue});
      const receipt = await txHash.wait();
      if(receipt){
        console.log('bet confirmation receipt',receipt)
      }
    
      const filter1 = contract.filters.BetPlaced();
      const filter2 = contract.filters.BetResolved();
      
      const event1 = await contract.queryFilter(filter1, receipt.blockNumber)
      console.log('event 1 bet placed', event1);

      const event2 = await contract.queryFilter(filter2, receipt.blockNumber)
      console.log('event 2 bet placed', event2);
    
    } catch (error) {
      setActiveGame(false)
      setError(true)
      console.log('error message', error)
    }
  }

  // web3js
  const oddEvenHandler = async (value) => {
    let contract = await new library.eth.Contract(Abi, address);
    let bnbValue = await library.utils.toWei(bnb.toString(), "ether");
  
    setActiveGame(prev => true);

    // gasprice high but sending bnb rejected
    let txHash;
    await contract.methods.placeBet(value).send({ from: account, value: bnbValue, gasPrice: 7000000000 })
      .on('transactionHash', hash => txHash = hash)
      .catch((e) => { 
        setActiveGame(prev => false); 
        console.log('error bet place ', e); 
        setError(true); 
      })
      .on('changed', (changedata) => {
        console.log('bet place change data', changedata)
      })
      .then((receipt) => {
        console.log('receipt', receipt)
        let r = receipt.events.BetPlaced.returnValues;
        let betId = r.betId;
        let account = r.player;
        let bet = r.bet;
        betInput.betId = betId;
        betInput.account = account;
        betInput.bet = bet;
      })


  }

  const oddHandler = () => {
    setActiveGame((prev) => !prev);
    setTimeout(() => {
      setActiveGame((prev) => !prev);
      setWinGame((prev) => !prev);
    }, 3000);
  };
  const evenHandler = () => {
    setActiveGame((prev) => !prev);
    setTimeout(() => {
      setActiveGame((prev) => !prev);
      setLossGame((prev) => !prev);

    }, 3000);
  };
  // const evenHandler = () => {
  //   setLossGame((prev) => !prev);
  //   setTimeout(() => {
  //     setLossGame((prev) => !prev);
  //     setNoMarbleGame((prev) => !prev);
  //   }, 3000);
  // };
  const quickPlayHandler = () => {
    if (!active) {
      quickActive.current.play();
    } else {
      quickDeactive.current.play();
    }
    setActive((prev) => !prev);
  };
  return (
    <>
      <section className="bg-dark-500  min-h-screen pb-14 hero-section relative cus_mobile_adjust">
        <Header checkAuth={checkAuth} />
        <div className="container">
          <div className="mx-auto hidden lg:flex items-center justify-center w-full my-10 md:my-4">
            <div
              className=" cursor-pointer marble-popup-parent relative"
              onClick={marbleHandler}
            >
              <div className="marbles-question">
                <i className="fas fa-question"></i>
              </div>
              <img src={Marbles} alt="" />
            </div>
            <p className="font-medium text-2xl ml-3">Marbles</p>
          </div>
          <div>
            <h1 className="font-mineCraft text-4xl mx-auto text-center hidden lg:block text-yellow my-8">
              <span className="minecraft-dollor">S</span>{" "}
              <CountUp end={200000} duration={2} separator=',' /> USD IN PRIZES
            </h1>
          </div>

          {!processing && !error && <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14 relative">
            <div
              className={isWalletConnected() ? 'even' : 'even disabled'}
              role="button"
              onClick={() => {
                if (isWalletConnected) {
                  etherHandler(2)
                }
              }
              }
              data-aos="fade-up"
            >
              {isWalletConnected() && <>
                <img src={EvenBg} alt="" className="w-full even-bg" />
                <img src={EvenBgHover} alt="" className="w-full even-hover" />
              </>}
              <p>Even</p>
              
            </div>
            <div
              className={isWalletConnected() ? 'odd' : 'odd disabled'}
              role="button"
              onClick={() => {
                if (isWalletConnected()) {
                  etherHandler(3)
                }
              }
              }
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {isWalletConnected() && <>
                <img src={OddBg} alt="" className="w-full odd-bg" />
                <img src={OddBgHover} alt="" className="w-full odd-hover" />
              </>}
              <p>Odd</p>
              <div className="tooltips"><span className="text-danger">Choose bet amount to play</span></div>
            </div>
            <div className="or hidden md:flex">
              <p className="font-bold text-xl">OR</p>
            </div>
          </div>
          }
          {processing &&
            <div className="pending_approve">
              <div className="mb-2 d-flex justify-content-center text-yellow">
              <div className="loader"></div>Pending
              </div>
              <h2 className="mb-4 text-2xl fw-bold ">
                Approve the transaction <br />through your wallet
              </h2>
              <p>Squid Moon games are decentralized apps on the BSC blockchain. You can view the smart contract <Link>hear</Link></p>
            </div>
          }


          {error &&
          <div className="pending_approve error_sec">
            <div className="mb-2 text-danger">
              Faild
            </div>
            <h2 className="mb-4 text-2xl fw-bold ">
              Transaction was not approved
            </h2>
            <span className="close_btn" onClick={()=>setError(false)}>Close</span>
          </div>
          }

          <div className="mt-16  flex lg:items-center lg:justify-between flex-col  lg:flex-row">
            <p className="text-yellow text-2xl font-bold">Select BNB amount</p>
            <div className="grid grid-cols-3 gap-4 items-center justify-between lg:my-0 my-8">
              {data.map((v, i) => (
                <div
                  className={`bg-dark-300 py-1 rounded-xl  cursor-pointer relative select-bnb ${currentActive === i ? "active" : ""
                    }`}
                  key={i}
                  onClick={() => activeHandler(i, v.value)}
                >
                  <div className="tick">
                    <i className="fas fa-check"></i>
                  </div>
                  <div
                    className={`flex  flex-col md:flex-row md:items-center px-4 py-2  pr-3  border-b  ${currentActive === i
                      ? "border-yellow-400"
                      : "border-dark-400"
                      }`}
                  >
                    <img
                      src={currentActive === i ? TinyBnbImgBlack : TinyBnbImg}
                      className="w-6"
                      alt=""
                    />
                    <p className=" mt-2 md:mt-0 md:ml-2 font-medium text-xl text-nowrap">
                      {v.bnb}
                    </p>
                  </div>
                  <div className="px-4 flex items-center pr-4 py-2">
                    <div className="md:flex items-center hidden ">
                      <img
                        src={
                          currentActive === i ? TinyStarImgBlack : TinyStarImg
                        }
                        alt=""
                      />
                      <p className="text-sm ml-2 font-bold">{v.star}</p>
                    </div>
                    <div className="flex items-center md:ml-3">
                      <img
                        src={
                          currentActive === i ? TinyDoller2Black : TinyDoller2
                        }
                        alt=""
                        className="hidden md:block "
                      />
                      <p className="text-sm md:ml-2 font-bold">{v.dollor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={quickPlayHandler}
              className={`border ${active ? " border-yellow" : " border-white "
                } flex items-center p-4 lg:py-7 lg:px-6 rounded-xl cursor-pointer justify-center transition-all`}
            >
              {active ? <img src={YellowThunder} alt="" /> : <Thunder />}{" "}
              <p className={`${active ? "text-yellow" : ""}  select-none ml-2`}>
                Enable Quickplay
              </p>
            </div>
          </div>
        </div>
        <audio ref={quickActive} src={QuickPlayActive}></audio>
        <audio ref={quickDeactive} src={QuickPlayDeactivate}></audio>
        <audio ref={bet1} src={SelectBnb1}></audio>
        <audio ref={bet2} src={SelectBnb2}></audio>
        <audio ref={bet3} src={SelectBnb3}></audio>
      </section>
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
      <MarbleModal
        activeGame={marbleGame}
        setActiveGame={setMarbleGame}
        gameHandler={marbleHandler}
      />
    </>
  );
};

export default HeroSection;
