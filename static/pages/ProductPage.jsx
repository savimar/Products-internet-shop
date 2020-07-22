import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductBox from '../components/ProductBox'
import Items from '../components/Const'

let product

export default class ProductPage extends React.Component {

  constructor (props) {
    super(props)
    let productUrl = this.props.match.params.product
    let arr = productUrl.split('-')
    let key = arr[0]
    let slug = arr[1]
    let items = Items()
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      if (item.key === Number.parseInt(key)) {
        product = item
        return
      }
    }
  }

  render () {
    return (
      <React.Fragment>
        <Header/>
        <ProductBox item={product}/>
        <Footer/>
      </React.Fragment>
    )
  }

}
