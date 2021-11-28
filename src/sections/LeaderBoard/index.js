/* eslint-disable no-unused-vars */

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
];

const PrevGame = () => {
  return (
    <section className="leader-board py-20">
      <div className="container text-center">
        <h1>Leaderboard</h1>
        <div className="leader-head text-center">
          <h2 className="font-mineCraft text-5xl uppercase">
            {" "}
            200,000 usd in prizes
          </h2>
          <p className="text-yellow text-2xl mt-4">
            11 days untill the winners announced
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrevGame;
