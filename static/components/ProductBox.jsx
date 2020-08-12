import * as React from 'react'
import Breadcrumb from './Breadcrumb'
import { HashRouter } from 'react-router-dom'

let path
const statusIdle = 'idle';
const statusPending = 'pending';
const statusReady ='ready'
const statusError ='error'
const statusCodeOK = 200;
const apiKey = '/api/product?key=';
const apiID = '/api/product?id=';
const apiDefault = '/api/product?slug=bag';
const panelLogin = '/#/panel/login';
const buttonBuy = 'Купить';
const buttonUpdate = 'Изменить';
const buttonSave = 'Сохранить';
const labelTitle = 'Введите новое наименование товара';
const labelDescription = 'Введите новое полное описание товара';
const labelKey = 'Введите числовой ключ товара';
const labelSlug = 'Введите ключевое наименование товара';
const mistake = 'Ошибка';
const search ='Идет поиск товара';
const load =  'Товары загружены';
const loadError = 'Ошибка загрузки товаров';
const formTitle = 'title';
const formDescriptionFull = 'descriptionFull';
const formKey = 'key';
const formSlug = 'slug';



export default class Products extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      status: statusIdle,
      products: [],
      beforeTitle: '',
      item: {
        title: 'Товар',
        descriptionFull: 'Описание',
        key: 1,
        slug: 'bag'
      }
    }
    this.getPath()
  }
//getting path for getting data from fetch
  getPath () {
    if (this.props.prodKey !== undefined && this.props.prodKey !== null) {
      path = apiKey + this.props.prodKey;
    } else if (this.props.prodId !== undefined && this.props.prodId !== null) {
      path = apiID + this.props.prodId;
    } else {
      path = apiDefault;
    }

  }
//rendering data without updating
  getProducts (products) {
    return (
      <React.Fragment>
        {products && products.length ? (
          products.map((item, index) => (
              <React.Fragment key={index}>
                <h5 className="card-title">{item.title}</h5>
                <img className="card-img-top" src={item.img} alt="img"></img>
                <p className="card-text">{item.descriptionFull}</p>
                <p className="card-text"> Цена {item.price} руб.</p>
                <a href="#" className="btn btn-primary">{buttonBuy}</a>
              </React.Fragment>
            )
          )) : (this.getErrorElement())
        }
        {this.renderElement()}

      </React.Fragment>
    )
  }
//send and get updated data
  onSave (event) {
    event.preventDefault()
    event.stopPropagation()

    fetch(`/api/product/${this.props.prodId}`, {
      method: 'put',
      credentials: 'same-origin',
      body: JSON.stringify(this.state.item),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status !== statusCodeOK) {
        return window.location = panelLogin
      } else {
        return res.json()
      }
    }).then(prod => {
      this.setState(() => ({
        item: prod
      }))
    })
      .catch(error => {
        console.log(error)
      })

  }
//changing data on a form
  onChange (event) {
    event.preventDefault()
    event.stopPropagation()
    const name = event.target.name
    switch (name) {
      case formTitle:
        this.state.item.title = event.target.value
        break
      case formDescriptionFull:
        this.state.item.descriptionFull = event.target.value
        break
      case formKey :
        this.state.item.key = event.target.value
        break
      case formSlug :
        this.state.item.slug = event.target.value
        break
      default :
        break
    }

    this.forceUpdate()
  }

//rendering data for updating
  renderForm (products) {
    return (
      <React.Fragment>
        {products && products.length ? (
          products.map((item, index) => (
            <HashRouter>
              <React.Fragment key={index}>
                <form>
                  <div className="form-group">
                    <p><label htmlFor={formTitle}>{item.title}</label></p>
                    <p><label htmlFor={formTitle}>{labelTitle}</label></p>
                    <input placeholder={item.title} name={formTitle} type="text" className="form-control"
                           id={formTitle}
                           value={this.state.item.title}
                           onChange={this.onChange.bind(this)}></input>
                  </div>
                  <h5 className="card-title">{this.state.item.title}</h5>
                  <img className="card-img-top" src={item.img} alt="img"></img>
                  <div className="form-group">
                    <p><label htmlFor={formDescriptionFull}>{labelDescription}</label></p>
                    <textarea placeholder={item.descriptionFull}
                              name={formDescriptionFull} className="form-control"
                              id={formDescriptionFull}
                              rows="3"
                              value={this.state.item.descriptionFull}
                              onChange={this.onChange.bind(this)}></textarea>
                  </div>
                  <p className="card-text"> Цена {item.price} руб.</p>
                  <div className="form-group">
                    <p><label htmlFor={formKey}>{labelKey}</label></p>
                    <input placeholder={item.key} name= {formKey} type="text" className="form-control"
                           id={formKey}
                           value={this.state.item.key}
                           onChange={this.onChange.bind(this)}></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor={formSlug}>{labelSlug}</label>
                    <input placeholder={item.slug} name={formSlug} type="text" className="form-control"
                           id={formSlug}
                           value={this.state.item.slug}
                           onChange={this.onChange.bind(this)}></input>
                  </div>
                  <p><a href="#" className="btn btn-primary">{buttonUpdate}</a></p>
                  <p>
                    <button onClick={this.onSave.bind(this)} type="button" className="btn btn-success">{buttonSave}
                    </button>
                  </p>
                </form>
              </React.Fragment>
            </HashRouter>)
          )) : (this.getErrorElement())
        }
        {this.renderElement()}
      </React.Fragment>
    )
  }

  getErrorElement () {
    return this.state.status ===  statusError ?
      (<div>
          <h4> {mistake} </h4>
        </div>
      ) : (
        <div>
          <h4>{search}</h4>
        </div>
      )
  }

 // getting data from server and set status
  renderProduct () {
    this.setState(state => ({
      status: statusPending
    }))
    return (
      fetch(path)
        .then(res => {
          if (path.startsWith(apiID) && res.status !== statusCodeOK) {
            return window.location = panelLogin
          } else {
            return res.json()
          }
        })
        .then(product => this.setState(() => ({
          products: product
        })))
        .then(() => this.setState(state => ({
          status: statusReady
        })))
        .catch(error => {
          console.error(error)
          this.setState(state => ({
            status: statusError
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
//alert
  renderElement () {
    if (this.state.status === statusReady) {
      return (
        <div className="alert alert-primary" role="alert">
          {load}
        </div>
      )
    } else if (this.state.status === statusError) {
      return (
        <div className="alert alert-danger" role="alert">
          {loadError}
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
              {this.props.isEdit ? (
                this.renderForm(products)
              ) : (
                this.getProducts(products)
              )}
            </div>
          </div>
        </div>
      </main>
    )
  }

}




