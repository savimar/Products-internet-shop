import * as React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Products from '../components/Products'
import Items from '../components/Const'

export default class IndexPage extends React.Component {

  render () {
    return (
      <React.Fragment>
        <Header/>
        <Products items={Items()}/>
        <Footer/>
      </React.Fragment>
    )
  }

}







