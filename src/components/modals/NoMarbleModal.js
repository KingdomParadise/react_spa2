import "./style.css";
import Gif from "../../assets/images/no-marbles2.gif";
import GifOverlay from "../../assets/images/no-marbles-overlay.png";
import WinDollor from "../../assets/images/golden-bnb.png";
const NoMarbleModal = ({ activeGame, setActiveGame, gameHandler }) => {
  return (
    <div className={`modal no-marble-modal ${activeGame ? "flex" : "hidden"} `}>
      <div className="modal-content flex justify-center items-end text-center pb-20 relative">
        <div className="close-modal" onClick={gameHandler}>
          <i className="fas fa-times"></i>
        </div>
        <img src={Gif} className="gif w-3/4" alt="" />
        <img src={GifOverlay} className="gif-overlay" alt="" />
        <div className="no-marble-modal-btm">
          <h2 className="font-bold mb-6">Result:</h2>
          <h2 className="font-bold mb-6">No marbles</h2>
          <div className="flex items-center justify-center md:mt-4 score">
            <div className="flex items-center">
              <img src={WinDollor} alt="" />
              <p className="ml-2 font-bold">- 512 SQM</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-10 text-lg text-white">
        There was no marbles in your hand, you get back 50% of your bet
      </p>
    </div>
  );
};

export default NoMarbleModal;
