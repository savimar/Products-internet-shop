import * as React from 'react'
import ReactDOM from 'react-dom'
import * as rrd from "react-router-dom";
export const Link = React.createContext(rrd.Link);
import Header from '../components/Header'
import Footer from '../components/Footer'
import Products from '../components/Products'

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

export default class IndexPage extends React.Component {


  render () {
    return (
      <React.Fragment>
        <Header />
        <Products items={items} />
        <Footer />
      </React.Fragment>
    )
  }



}







