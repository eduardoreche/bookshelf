import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import store from "./store";
import theme from "./theme";
import Main from "./screens/Main";
import { CountryProvider } from "./context/CountryContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <CountryProvider>
            <Main />
          </CountryProvider>
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
