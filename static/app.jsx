import React from 'react'
import ReactDOM from 'react-dom'
import ProductBox from "./components/ProductBox.jsx";
/*import './public/css/style.css';*/
import { Router, Route, Switch } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
/*import Page3 from "./pages/page3.jsx";*/
/*import ProductService from '/ProductService';*/

import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
//var createHistory = require('history').createHistory

class App extends React.Component {

  constructor() {
    super()
    console.log("ропорпоп");
  }
 // const propsValues = ProductService.getProductByKey();

  render() {
    return <Router history={ history }>
      <Switch>
        <Route exact path="/" component={ IndexPage } />
        <Route exact path="/products/:product" component={ ProductPage } />
        <Route component={NotFound} />
      </Switch>
    </Router>;
  }
}
//ReactDOM.render(<App />, document.getElementById('root'));
