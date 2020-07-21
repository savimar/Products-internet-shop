import * as React from 'react'
import ReactDOM from 'react-dom'
import * as rrd from 'react-router-dom'
import { Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'
import IndexPage from './pages/IndexPage.jsx'
import ProductPage from './pages/ProductPage'
import NotFound from './pages/NotFound'
import { createBrowserHistory, createHashHistory } from 'history'

class App extends React.Component {

  render () {
    return (
      <Router history={createHashHistory()}>
        <Switch>
          <Route exact path="/" component={IndexPage}/>
          <Route path="/#/" component={() => (<Redirect to="/"/>)}/>
          <Route path="/items/:product" component={ProductPage}/>
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
