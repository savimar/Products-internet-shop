import * as React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom'
import IndexPage from './pages/IndexPage.jsx'
import ProductPage from './pages/ProductPage'
import NotFound from './pages/NotFound'
import { createHashHistory } from 'history'
import PanelPage from './pages/PanelPage.jsx'
import PanelProductsPage from './pages/PanelProductsPage.jsx'

class App extends React.Component {

  render () {
    return (
      <HashRouter history={createHashHistory()}>
        <Switch>
          <Route exact path="/" component={IndexPage}/>
          <Route exact path="/product/:product" component={ProductPage}/>
          <Route exact path="/panel" component={PanelPage}/>
          <Route exact path="/panel/product" component={PanelProductsPage}/>
          <Route exact path="/panel/product/:product" component={PanelProductsPage}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
