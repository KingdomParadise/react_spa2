import "./style.css";
import { useState } from 'react';
import Logo from "../../assets/images/LOGO_DESKTOP.png";
import SelectWalletModal from "../modals/SelectWalletModal";
import { injected, walletConnect } from "../../hooks/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const Index = ({ loading }) => {
  const [show, setShow] = useState(false);
  const { activate } = useWeb3React();

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
  return (
    <>
      <div className="flex preloader" data-aos="zoom-out">
        <div className="flex justify-center md:mt-0 md:items-center w-full h-full align-items-center">
          <div>
            <div data-aos="fade-up" data-aos-delay="700">
              <img src={Logo} alt="" className=" mx-auto mb-4" />
            </div>
            <h2 className="title" data-aos="fade-up" data-aos-delay="700">
              <span>#SQM</span> Present the first game
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="700"
              className="text-xl font-medium yellow px-4"
            >
              Place your bet in BNB then guess if there is an even number or odd
              number of marbles.
            </p>
            <div
              className="border border-white w-48  rounded-full h-4 mx-auto mt-10 progress"
              style={{ padding: 2 }}
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="w-full h-full bg-white rounded-full progress-content"></div>
            </div>
          </div>
        </div>
      </div>
      <SelectWalletModal modalShow={show} setModalView={setShow} metamask={metaMaskConnect} walletconnect={walletConnector} />
    </>
  );
};

export default Index;