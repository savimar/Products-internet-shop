import React from "react";
import Header from '../components/Header'
import IndexPage from './IndexPage'
import Footer from '../components/Footer'
import ProductBox from '../components/ProductBox'
let product;
const items =
  [
    {
      title: 'Товар 1',
      img: '/public/img/product1.jpg',
      description: 'Краткое описание первого товара',
      descriptionFull: 'Полное описание первого товара',
      key: 500,
      price: 1000,
      slug: 'bag'
    },
    {
      title: 'Товар 2',
      img: '/public/img/product2.jpg',
      description: 'Краткое описание второго товара',
      descriptionFull: 'Полное описание второго товара',
      key: 750,
      price: 1500,
      slug: 'program'
    },
    {
      title: 'Товар 3',
      img: '/public/img/product3.jpg',
      description: 'Краткое описание третьего товара',
      descriptionFull: 'Полное описание третьего товара',
      key: 1000,
      price: 2000,
      slug: 'light'
    }];

export default class ProductPage extends React.Component {

  constructor (props) {
    super(props);
     let productUrl = this.props.match.params.product;
    let arr = productUrl.split("-");
    let key = arr[0];//.replace('/product/', '');
    let slug = arr[1];
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.key === Number.parseInt(key)) {
        product = item;
        return
      }

    }
  }
    render()
    {
      return (
        <React.Fragment>
          <Header/>
          <ProductBox item={product}/>
          <Footer/>
        </React.Fragment>
      )
    }

}
