import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductBox from '../components/ProductBox'

let key
export default class ProductPage extends React.Component {

  constructor (props) {
    super(props)
    let productUrl = this.props.match.params.product
    let arr = productUrl.split('-')
    key = arr[0]
  }

  render () {
    return (
      <React.Fragment>
        <Header/>
        <ProductBox prodId={key}/>
        <Footer/>
      </React.Fragment>
    )
  }

}
