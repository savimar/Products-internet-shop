import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductBox from '../components/ProductBox'
import Products from '../components/Products'

let id
export default class ProductPage extends React.Component {

  constructor (props) {
    super(props)
    let productUrl = this.props.match.params.product;
    try {
      let arr = productUrl.split('-')
      id = arr[0]
    } catch (e) {
      id= undefined
    }
  }

  render () {
    return (
      <React.Fragment>
        <Header css={'headerPanel'}/>
        {id ? (
          <ProductBox prodId={id} isEdit={true}/>
        ) : (
          <Products addNew={true} button ={"panel"}/>
        )}
        <Footer/>
      </React.Fragment>
    )
  }

}
