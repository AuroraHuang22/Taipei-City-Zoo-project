import React from "react";
import { Provider } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Map from "./Pages/Map";
import store from "./Redux/Store";
import Header from "./Utils/Header";
// import Footer from "./Utils/Footer";
import Member from "./Pages/Member";
import ShowAllAnimals from "./Pages/ShowAllAnimals";
import Entrance from "./Pages/Entrance";
import Landing from "./Pages/Landing";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/all" component={ShowAllAnimals} />
        <Route exact path="/map" component={Map} />
        <Route path="/member" component={Member} />
        <Route path="/entrance" component={Entrance} />
        <Redirect to="/404" />
      </Switch>
      {/* <Footer /> */}
    </Provider>
  );
}

export default App;
