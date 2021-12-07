import "./style.css";
import METAMASK from '../../assets/images/METAMASK.png';
import WALLETCONNECTOR from '../../assets/images/WalletConnector.svg';

const SelectWalletModal = ({ modalShow, setModalView, metamask, walletconnect }) => {

  return (
    <div className={`modal lost-modal ${modalShow ? "flex" : "hidden"} `}>
      <div className="wallet-modal justify-center items-end text-center pb-10 relative rounded-xl p-4">
        <div className="flex justify-between items-center" onClick={() => setModalView(false)}>
          <h5>Connect a wallet</h5>
          <i className="fas fa-times close-icon"></i>
        </div>
        <div className="flex justify-between mt-14 p-2.5 wallet-item rounded-md" onClick={() => metamask()}>
          <p>MetaMask</p>
          <img src={METAMASK} alt=''/>
        </div>
        <div className="flex justify-between mt-6 p-2.5 wallet-item rounded-md" onClick={() => walletconnect()}>
          <p>WalletConnect</p>
          <img src={WALLETCONNECTOR} alt=''/>
        </div>
      </div>
    </div>
  );
};

export default SelectWalletModal;
