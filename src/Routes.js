import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from "./Pages/Main/Main";
import Signup from "./Pages/Signup/Signup";
import List from "./Pages/List/List";
import Detail from "./Pages/Detail/Detail";
import Nav from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer";
import Cart from "./Pages/Cart/Cart";
import MyPage from "./Pages/MyPage/MyPage";

class Routes extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/list" component={List} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/mypage" component={MyPage} />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default Routes;
