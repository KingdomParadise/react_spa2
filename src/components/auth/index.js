import "./../preloader/style.css";
import { useState } from 'react';
import Logo from "../../assets/images/LOGO_DESKTOP.png";
import M_Logo from "../../assets/images/m_logo.png";
import Wicon from "../../assets/images/winner1.png";
import Coinl from "../../assets/images/coin_l.png";
import Coinr from "../../assets/images/coin_r.png";
import SelectWalletModal from "../modals/SelectWalletModal";
import { injected, walletConnect } from "../../hooks/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const Index = ({ loading, laterFn }) => {
  const [show, setShow] = useState(false);
  const { activate, chainId , account, library} = useWeb3React();

  const metaMaskConnect = async () => {
    try {
      await activate(injected);
    }
    catch (e) {
      console.error(e);

    }
  };

  const switchNetwork = async () => {
    await library.eth.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }]
    })
  }

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

  const connectLater = () => {
    sessionStorage.setItem('connect_later', true);
    laterFn();
  }

  return (
    <>
      <div className="" >
        <div className="row flex_direct">
          <div className="col-md-5 wallet_left">
            <div>
              <div className="p-5 left_content">
                <img src={M_Logo} alt="" className=" m_logo" />
                <h1 className="font-mineCraft text-4xl  text-yellow my-8">  <span class="minecraft-dollor">S</span> 200,000 usd in prizes</h1>
              </div>
            </div>
          </div>
          <div className="col-md-7 wallet_right">
            <div>
              <img src={Logo} alt="" className=" mx-auto mb-4" />
            </div>

            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                {/* connect wallet */}
                {!account && <div className="wallet_content">
                  <div className="wallet_list font12 mb-4">
                    <div className="rank_tag">
                      <div className="ranklist">
                        1
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex ">
                        <div className="pe-2">
                          <img src={Wicon} className="w-icon" alt=''/>
                        </div>
                        <div>
                          0x864...F7B6
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="pe-3"><i className="fas fa-star"></i> 10 000</div>
                        <div><i className="fas fa-dollar-sign fadoller"></i> $200 000 SQM</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h1 className="fw-bold font_big mb-4">Bet BNB - Get SQM & win big prize</h1>
                    <h2 className="fw-bold mb-4">Start by connecting you wallet </h2>
                  </div>
                  <div className=" mb-4">
                    <button className="wallet_connect_btn" onClick={() => setShow(true)}><i className="fas fa-dice-d20"></i> Connect Wallet</button>
                  </div>
                </div>}

                {/* error Network */}
                {account && chainId !== 56 && 
                  <div className="wallet_content error_network">
                    <div className="mb-3 ">
                      <h1 className="fw-bold text-danger mb-4">Incorrect Network</h1>
                      <div className="mb-4">To play Squid Moon games your wallet needs to be on Binance Smart Chain network</div>
                    </div>
                    <div className=" mb-4">
                      <button className="wallet_connect_btn" onClick={switchNetwork}><i className="fas fa-dice-d20"></i> Switch Network</button>
                    </div>
                  </div>
                }
              </div>
            </div>


            <div className="d-flex justify-content-between connect_later_sec">
              <div>
                <img src={Coinl} alt="" className="coinl" />
              </div>
              <div className="align-self-center con_later mb-4" onClick={connectLater}>Connect later</div>
              <div>
                <img src={Coinr} alt="" className="coinr" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SelectWalletModal modalShow={show} setModalView={setShow} metamask={metaMaskConnect} walletconnect={walletConnector} />
    </>
  );
};

export default Index;
