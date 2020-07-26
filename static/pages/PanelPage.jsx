import * as React from 'react'
import Footer from '../components/Footer'
import Products from '../components/Products'
import Header from '../components/Header'

export default class PanelPage extends React.Component {

  render () {
    return (
      <React.Fragment>
        <Header css = {'headerPanel'}/>
        <Products button ={"panel"}/>
        <Footer/>
      </React.Fragment>
    )
  }

}
