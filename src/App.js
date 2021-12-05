import React, { useEffect, Suspense } from "react";
import "./App.css";
// import Home from "./pages/Home";
import Preloader from "./components/preloader";
import Aos from "aos";
import "aos/dist/aos.css";
<<<<<<< Updated upstream
import { useWeb3React } from "@web3-react/core";
import { injected } from "./hooks/wallet/Connectors";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";

function App() {
  const [loading, setLoading] = useState(false);
  const [tried, setTried] = useState(false);
  const { active, accout, activate } = useWeb3React();
  useEffect(() => {
    // setLoading((prev) => !prev);
    // setTimeout(() => {
    //   setLoading((prev) => !prev);
    // }, 4000);
    // activate()
    Aos.init({ duration: 500 });
  }, []);

  useEffect(() => {
    setLoading(true);
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      }
      else {
        setTried(true);
      }
    })
  }, []);

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active]);
  
  return <div className="App">{!active ? <Preloader loading={loading} /> : <Home />}</div>;
=======
const Home = React.lazy(async () => {
  const [moduleExports] = await Promise.all([
    import("./pages/Home"),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  return moduleExports;
});
function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <Suspense fallback={<Preloader />}>
        <Home />
      </Suspense>
    </div>
  );
>>>>>>> Stashed changes
}

export default App;
