import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Preloader from "./components/preloader";
import Aos from "aos";
import "aos/dist/aos.css";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./hooks/wallet/Connectors";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.polarsync.app/subgraphs/id/QmammBhGH4bB5VhRhe46BWamNgj5ygXPDQ2V76d9mtbKk6',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
  
  return (
    <ApolloProvider client={client}>
      <div className="App">{!active ? <Preloader loading={loading} /> : <Home />}</div>
    </ApolloProvider>
  )
}

export default App;
