import React from 'react'
import Breadcrumb from './Breadcrumb'


export default class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [],
    }
  }

  renderProduct () {
    return (
      fetch('/api/product?key=' + this.props.prodId)
        .then(res => res.json())
        .then(product => this.setState(state => ({
          products: product
        })))
        .catch(error => {
          console.error(error)
        })
    )

  }

  componentDidMount () {
    this.renderProduct()
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
                <div>
                  <h4>Идет поиск товара</h4>
                </div>
              )
              }
            </div>
          </div>
        </div>
      </main>
    )
  }

}




