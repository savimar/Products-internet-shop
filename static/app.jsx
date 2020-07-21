import * as React from 'react'
import ReactDOM from 'react-dom'
import * as rrd from "react-router-dom";
import { Router,  Switch, Route, Redirect , withRouter } from 'react-router-dom';
export const Link = React.createContext(rrd.Link);
import IndexPage from "./pages/IndexPage.jsx";
import ProductPage from "./pages/ProductPage";
/*import Page3 from "./pages/page3.jsx";*/
/*import ProductService from '/ProductService';*/
import NotFound from "./pages/NotFound";
/*import './public/css/style.css';*/

import { createBrowserHistory, createHashHistory } from 'history'
import Footer from './components/Footer'
/*import Switch from 'react-router/modules/Switch'
import Router from 'react-router/modules/Router'*/
//export const history = createBrowserHistory();
//var createHistory = require('history').createHistory

class App extends React.Component {

  /*constructor() {
    super()
    console.log("ропорпоп");
  }*/
 //const propsValues = ProductService.getProductByKey();

  render() {
    return(
      <Router history={createHashHistory()}>
      <Switch>

        <Route exact path="/" component={ IndexPage}  />
        <Route path="/#/" component={() => (<Redirect to="/"/>)} />
       {/* <Route strict path="/" component={ IndexPage} replace/>*/}
        <Route path="/items/:product" component={ProductPage} />
        <Route component={NotFound} replace />
    {/*    <Redirect from="/" to="/#" />*/}
      </Switch>
    </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
