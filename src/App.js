import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Preloader from "./components/preloader";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((prev) => !prev);
    setTimeout(() => {
      setLoading((prev) => !prev);
    }, 4000);

    Aos.init({ duration: 1000 });
  }, []);

  return <div className="App">{loading ? <Preloader /> : <Home />}</div>;
}

export default App;
