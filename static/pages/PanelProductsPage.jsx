import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductBox from '../components/ProductBox'

let id
export default class ProductPage extends React.Component {

  constructor (props) {
    super(props)
    let productUrl = this.props.match.params.product
    console.log(productUrl)
    let arr = productUrl.split('-')
    id = arr[0]
  }

  render () {
    return (
      <React.Fragment>
        <Header css = {'headerPanel'}/>
        <ProductBox prodId={id}/>
        <Footer/>
      </React.Fragment>
    )
  }

}
