/* eslint-disable no-unused-vars */
import { TinyBnb, TinyStar, TinyDollor } from "../../assets/svg";
import dollor from "../../assets/images/CUSTOM_DOLLOR_TINY_green.png";
import BnbWhite from "../../assets/images/BNBWHITE.png";
import "./style.css";

const data = [
  {
    bet: "Odd",
    bnb: 1,
    pending: true,
    result: [{ win: false }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
];

const PrevGame = () => {
  return (
    <section className="prev-game">
      <div className="container">
        <h2 className="font-bold text-2xl"> Yours previous games</h2>
        <div className="flex items-center mt-6 overflow-auto game-card-container">
          {data.map((v, i) => (
            <div
              className={`prev-game-card rounded-2xl mr-8 flex-shrink-0 ${
                v.result[0].win ? "win" : ""
              }`}
              key={i}
            >
              <div className="pb-2 pt-2 px-4 pr-24 bg-dark-700 rounded-t-2xl ">
                <h4 className="font-bold text-3xl">Bet: {v.bet}</h4>
                <div className="flex items-center">
                  <img src={BnbWhite} alt="" />
                  <p className="text-base font-bold mx-1">{v.bnb} BNB</p>
                  <span>~512 SQM</span>
                </div>
              </div>
              {v.pending ? (
                <div className="prev-game-card-btm pb-2 pt-2 px-4 w-full">
                  <p className="font-bold text-base">Result</p>
                  <div className="flex items items-center text-xs mt-1">
                    <i className="far fa-clock"></i>
                    <p className="ml-1">Pending</p>
                  </div>
                </div>
              ) : (
                <div
                  className={`prev-game-card-btm pb-2 pt-2 px-4 w-full flex justify-between `}
                >
                  <div>
                    <p className="font-bold text-base">Result</p>
                    <div className="flex items items-center text-xs mt-1">
                      <p className="">Odd/Win</p>
                    </div>
                  </div>
                  <div className="flex items-end text-base prev-game-card-btm-right">
                    <div className="flex items-center">
                      <TinyStar />
                      <p className="text-xs ml-1">+23</p>
                    </div>
                    <div className="flex items-center ml-2">
                      <img src={dollor} alt="" />
                      <p className="text-xs ml-1">+512 SQM</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrevGame;
