import React from "react";
import { Link } from "react-router-dom";

export default class ProductPage extends React.Component {
  render () {
    const { product } = this.props;
    return
    <main>
      <div className="col-8 offset-2 col-sm-10 offset-sm-1 content">
        <nav className="breadcrumb">
          <Link to ="/" className='breadcrumb-item active'>Домой</Link>
        </nav>
      </div>
      <div className="container">
        <div className="box">
          <div className="content">
            <div className="product">
              <h5 className="card-title">{product.title}</h5>
              <img className="card-img-top" src={product.img} alt="img"/>
              <p className="card-text">{product.descriptionFull}</p>
              <p className="card-text"> Цена {product.price} руб.</p>
              <a href="#" className="btn btn-primary">Купить</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  }
}
