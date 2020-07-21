import React from 'react'
import * as rrd from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
//const ProductService = require('../../ProductService')
//export const Link = React.createContext(rrd.Link);

import { HashRouter, BrowserRouter, Link, Router } from 'react-router-dom'
//const Link = ReactRouterDOM.Link;

export default class Products extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <main>
        <div className="container">
          <div className="content">
            <Breadcrumb/>
            {this.props.items.map((item, index) => (
              <React.Fragment key={index}>
                <div className="card mb-3">
                  <HashRouter>
                  <h5 className="card-title">{item.title}</h5>
                  <img className="card-img-top" src={item.img} alt="img"></img>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"> Цена {item.price} руб.</p>
                    <Link className="btn btn-primary" to={'/items/' + item.key + '-' + item.slug}>Купить</Link>
                  </HashRouter>

                </div>
              </React.Fragment>
            ))}
          </div>
          {/*<div className="card mb-3">
                <img className="card-img-top" src="https://pixs.ru/images/2020/07/04/product1.jpg"
                     alt="Card image cap"/>
                <h5 className="card-title">Товар 1</h5>
                <p className="card-text">Краткое описание первого товара</p>
                <p className="card-text">Цена 1000 руб.</p>
                <button type="button" className=" btn btn-primary ">Купить</button>*/}
        </div>
      </main>

    )
  }
}

/*<div className="product">
<h5>{ this.props.title }</h5>
{ this.props.children }
</div>;*/
