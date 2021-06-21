import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Map from "./Pages/Map";
import store from "./Redux/Store";
import Header from "./Utils/Header";
// import Footer from "./Utils/Footer";
import Member from "./Pages/Member";
import ShowAllAnimals from "./Pages/ShowAllAnimals";
import Entrance from "./Pages/Entrance";
import Landing from "./Pages/Landing";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/all" component={ShowAllAnimals} />
          <Route exact path="/map" component={Map} />
          <Route path="/member" component={Member} />
          <Route path="/entrance" component={Entrance} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
      {/* <Footer /> */}
    </Provider>
  );
}

export default App;
