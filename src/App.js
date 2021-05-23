import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Map from "./Pages/Map";
import store from "./Redux/Store";
import Header from "./Utils/Header";
import Footer from "./Utils/Footer";
import Member from "./Pages/Member";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route path="/map" component={Map} />
          <Route path="/member" component={Member} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
