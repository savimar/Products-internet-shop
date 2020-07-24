import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { HashRouter, BrowserRouter, Link } from 'react-router-dom'

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
      fetch('/api/product')
        .then(setTimeout(function () {
        }, 200))
        .then(res => res.json())
        .then(list => this.setState({ list }))
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

  /*fetch('/api/product')
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      return JSON.parse(json)
    }.bind(this))*/

  /* let response = await fetch('/api/products');
   if (response.ok) { // если HTTP-статус в диапазоне 200-299
                      // получаем тело ответа (см. про этот метод ниже)
     let json = await response.json();
     return  await JSON.parse(json);*/
  /* return fetch('/api/products')
       .then(response => response.json()) // преобразуем ответ в json
       .then(data => {
         JSON.parse(data) // выводим в консоль результат выполнения response.json()
       })*/
  //   .catch(error => console.error(error))

  //}

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
                        <Link className="btn btn-primary" to={'/items/' + item.key + '-' + item.slug}>Купить</Link>
                      </HashRouter>
                    </div>
                  </React.Fragment>
                )
              )) : (
              <div>
                <h4>Товары не найдены</h4>
              </div>)
            }
            {this.renderElement()}
          </div>
        </div>
      </main>
    )

  }

}
