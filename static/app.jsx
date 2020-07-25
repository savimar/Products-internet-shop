import * as React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom'
import IndexPage from './pages/IndexPage.jsx'
import ProductPage from './pages/ProductPage'
import NotFound from './pages/NotFound'
import { createHashHistory } from 'history'

class App extends React.Component {

  render () {
    return (
      <HashRouter history={createHashHistory()}>
        <Switch>
          <Route exact path="/" component={IndexPage}/>
          <Route exact path="/items/:product" component={ProductPage}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
