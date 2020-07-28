import React from 'react'
import Breadcrumb from './Breadcrumb'
import NotFound from '../pages/NotFound'
import { HashRouter, Link } from 'react-router-dom'

export default class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [],
      status: 'idle',
    }
  }

  renderProduct () {
    this.setState(state => ({
      status: 'pending'
    }))
    return (
      fetch('/api/product?key=' + this.props.prodId)
        .then(res => res.json())
        .then(product => this.setState(state => ({
          products: product
        })))
        .then(() => this.setState(state => ({
          status: 'ready'
        })))
        .catch(error => {
          console.error(error)
          this.setState(state => ({
            status: 'error'
          }))
        })
    )

  }

  componentDidCatch (error, info) {
    alert('Обнаружена ошибка' + error)
    console.log('Ошибка class ProductBox ' + info)
  }

  componentDidMount () {
    this.renderProduct()
  }

  renderElement () {
    if (this.state.status === 'ready') {
      return (
        <div className="alert alert-primary" role="alert">
          Товары загружены
        </div>
      )
    } else if (this.state.status === 'error') {
      return (
        <div className="alert alert-danger" role="alert">
          Ошибка загрузки товаров
        </div>
      )
    }

  }

  render () {
    const { products } = this.state
    return (
      <main>
        <div className="container">
          <div className="box">
            <div className="content">
              <Breadcrumb/>
              {products && products.length > 0 ? (
                products.map((item, index) => (
                    <React.Fragment key={index}>
                      <h5 className="card-title">{item.title}</h5>
                      <img className="card-img-top" src={item.img} alt="img"></img>
                      <p className="card-text">{item.descriptionFull}</p>
                      <p className="card-text"> Цена {item.price} руб.</p>
                      <a href="#" className="btn btn-primary">Купить</a>
                    </React.Fragment>
                  )
                )) : (
                this.state.status === 'error' ?
                  (<div>
                      <h4> Ошибка </h4>
                    </div>
                  ) : (
                    <div>
                      <h4>Идет поиск товаров</h4>
                    </div>
                  )
              )
              }
              {this.renderElement()}
            </div>
          </div>
        </div>
      </main>
    )
  }

}




