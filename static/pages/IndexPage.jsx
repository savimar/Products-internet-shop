import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default class IndexPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { products: this.props.data.products }
    this.productList = this.productList.bind(this)
  }

  productList (text) {
    var productList = this.props.data.items(function (item) {
      return item
    })
    this.setState({ items: productList })
  }

  render () {
    return (
    //  <Navigation />

          <div className="container">
            <div className="box">
              <div className="col-8 offset-2 col-sm-10 offset-sm-1 content">
                <nav className="breadcrumb">
                  <Link to ="/" className="breadcrumb-item active">Домой</Link>
                </nav>
                <div className="card mb-3">
                  <img className="img-fluid" src="https://pixs.ru/images/2020/07/04/product1.jpg"
                       alt="Card image cap"/>
                  <h5 className="card-title">Товар 1</h5>
                  <p className="card-text">Краткое описание первого товара</p>
                  <p className="card-text">Цена 1000 руб.</p>
                  <button type="button" className=" btn btn-primary ">Купить</button>
                </div>
             {/* <div className="card mb-3">
                  {this.productList().map((item, index) => (
                    <h5 key={index} className="card-title">{item.title}</h5>,
                    <img className="card-img-top" src={item.img} alt="img"></img>,
                    <p className="card-text">{item.description}</p>,
                    <p className="card-text"> Цена {item.price} руб.</p>,
                    < Link to} "/product/" + {item.key} + "-" + {item.slug}"className="btn btn-primary">Купить</Link>
                   ))}
                </div>*/}
              </div>
            </div>
          </div>


 //  <Footer />
    )
  }
}

