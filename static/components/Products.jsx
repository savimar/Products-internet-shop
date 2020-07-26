import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { HashRouter, Link } from 'react-router-dom'

export default class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      status: 'idle'
    }

  }

  renderProducts () {
    this.setState(state => ({
      status: 'pending'
    }))

    return (
      new Promise(resolve => {
        setTimeout(() => {
          resolve(fetch('/api/products')
            .then(res => res.json())
            .then(list => this.setState({ list }))
            .then(() => this.setState(state => ({
              status: 'ready'
            })))
          )
        }, 500)
      }).catch(error => {
        console.error(error)
        this.setState(state => ({
          status: 'error'
        }))
      })

    )
  }

  componentDidMount () {
    this.renderProducts()
  }

  renderElement () {
    if (this.state.status === 'ready') {
      return (
        <div className="alert alert-primary" role="alert">
          Товары загружены
        </div>
      )
    } else if (this.state.status === 'ready') {
      return (
        <div className="alert alert-danger" role="alert">
          Ошибка загрузки товаров
        </div>
      )
    }

  }

  render () {
    const { list } = this.state
    return (
      <main>
        <div className="container">
          <div className="content">
            <Breadcrumb/>
            {list.length ? (
              list.map((item, index) => (

                  <React.Fragment key={index}>
                    <div className="card mb-3">
                      <HashRouter>
                        <h5 className="card-title">{item.title}</h5>
                        <img className="card-img-top" src={item.img} alt="img"></img>
                        <p className="card-text">{item.description}</p>
                        <p className="card-text"> Цена {item.price} руб.</p>
                        {this.props.button === 'index' ? (
                          <Link className="btn btn-primary" to={'/product/' + item.key + '-' + item.slug}>Купить</Link>
                        ) : (
                          <Link className="btn btn-primary" to={'/panel/product/' + item._id}>Купить</Link>
                        )
                        }
                      </HashRouter>
                    </div>
                  </React.Fragment>
                )
              )) : (
              <div>
                <h4>Идет поиск товара</h4>
              </div>)
            }
            {this.renderElement()}
          </div>
        </div>
      </main>
    )

  }

}
