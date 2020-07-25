import * as React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Products from '../components/Products'

export default class IndexPage extends React.Component {

  render () {
    return (
      <React.Fragment>
        <Header/>
        <Products/>
        <Footer/>
      </React.Fragment>
    )
  }

}







