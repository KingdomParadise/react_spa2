import "./style.css";
import Logo from "../../assets/images/LOGO_DESKTOP.png";

const Index = () => {
  return (
    <div className="flex preloader" data-aos="zoom-out">
      <div className="flex justify-center items-center w-full h-full">
        <div>
          <div data-aos="fade-up" data-aos-delay="700">
            <img src={Logo} alt="" className=" mx-auto" />
          </div>
          <h2 className="title" data-aos="fade-up" data-aos-delay="700">
            #SQM Present the first game
          </h2>
          <p data-aos="fade-up" data-aos-delay="700">
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
  );
};

export default Index;
