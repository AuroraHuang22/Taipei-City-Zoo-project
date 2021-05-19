import React from "react";
import Map from "./Pages/map";
import store from "./Redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <Map />
      </Provider>
    </>
  );
}

export default App;
