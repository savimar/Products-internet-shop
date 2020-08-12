import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { HashRouter, Link } from 'react-router-dom'


const statusIdle = 'idle';
const statusPending = 'pending';
const statusReady ='ready'
const statusError ='error'
const statusCodeOK = 200;
const caption = 'Добавление нового товара';

const panelLogin = '/#/panel/login';
const buttonBuy = 'Купить';
const buttonUpdate = 'Изменить';
const labelTitle = 'Введите новое наименование товара';
const labelIMG = 'Введите новый путь к изображению товара';
const labelDescription = 'Введите новое краткое описание товара';
const labelDescriptionFull = 'Введите новое полное описание товара';
const labelKey = 'Введите числовой ключ товара';
const labelSlug = 'Введите ключевое наименование товара';
const labelPrice = 'Введите цену товара (только число)';
const mistake = 'Ошибка';
const search ='Идет поиск товаров';
const load =  'Товары загружены';
const loadError = 'Ошибка загрузки товаров';
const formTitle = 'title';
const formDescriptionFull = 'descriptionFull';
const formDescription = 'description';
const formKey = 'key';
const formSlug = 'slug';
const formIMG = 'img';
const formPrice = 'price';

export default class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      status: statusIdle,
      newProduct: {
        title: '',
        img: '',//'/public/img/product1.jpg',
        description: '',
        descriptionFull: '',
        price: 0,
        key: 0,
        slug: ''
      }
    }

  }
//getting data from server and set status
  renderProducts () {
    this.setState(state => ({
      status: statusPending
    }))

    return (
      new Promise(resolve => {
        setTimeout(() => {
          resolve(fetch('/api/products')
            .then(res => {
              if (this.props.button === 'panel' && res.status !== statusCodeOK) {
                return window.location = panelLogin
              } else {
                return res.json()
              }
            })
            .then(list => this.setState({ list }))
            .then(() => this.setState(state => ({
              status: statusReady
            })))
          )
        }, 1000)
      }).catch(error => {
        console.error(error)
        this.setState(state => ({
          status: statusError
        }))
      })

    )
  }

  componentDidMount () {
    this.renderProducts()
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
    const { list } = this.state
    return (
      <main>
        <div className="container">
          <div className="content">
            <Breadcrumb/>
            {this.props.addNew ? (
              this.addNewProduct()
            ) : (
              <React.Fragment></React.Fragment>)}
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
                          <Link className="btn btn-primary" to={'/product/' + item.key + '-' + item.slug}>{buttonBuy}</Link>
                        ) : (
                          <Link className="btn btn-primary" to={'/panel/product/' + item._id}>{buttonUpdate}</Link>
                        )
                        }
                      </HashRouter>
                    </div>
                  </React.Fragment>
                )
              )) : (
              this.state.status === statusError ?
                (<div>
                    <h4> {mistake} </h4>
                  </div>
                ) : (
                  <div>
                    <h4>{search}</h4>
                  </div>
                )
            )
            }

            {this.renderElement()}
          </div>
        </div>
      </main>
    )

  }

  addNewProduct () {
    return (
      <form>
        <p><h2>{caption}</h2></p>
        <div className="form-group">
          <p><label htmlFor={formTitle}>{labelTitle}</label></p>
          <input placeholder={this.state.newProduct.title} name={formTitle} type="text" className="form-control"
                 id={formTitle}
                 value={this.state.newProduct.title}
                 onChange={this.onChange.bind(this)}></input>
        </div>
        <div className="form-group">
          <p><label htmlFor={formIMG}>{labelIMG}</label></p>
          <input placeholder={this.state.newProduct.img} name={formIMG} type="text" className="form-control"
                 id={formIMG}
                 value={this.state.newProduct.img}
                 onChange={this.onChange.bind(this)}></input>
        </div>

        <div className="form-group">
          <p><label htmlFor={formDescription}>{labelDescription}</label></p>
          <textarea placeholder={this.state.newProduct.description}
                    name={formDescription} className="form-control"
                    id={formDescription}
                    rows="2"
                    value={this.state.newProduct.description}
                    onChange={this.onChange.bind(this)}></textarea>
        </div>


        <div className="form-group">
          <p><label htmlFor={formDescriptionFull}>{labelDescriptionFull}</label></p>
          <textarea placeholder={this.state.newProduct.descriptionFull}
                    name= {formDescriptionFull} className="form-control"
                    id= {formDescriptionFull}
                    rows="3"
                    value={this.state.newProduct.descriptionFull}
                    onChange={this.onChange.bind(this)}></textarea>
        </div>
        <div className="form-group">
          <p><label htmlFor={formPrice}>{labelPrice}</label></p>
          <input placeholder={this.state.newProduct.price} name={formPrice} type="text" className="form-control"
                 id={formPrice}
                 value={this.state.newProduct.price}
                 onChange={this.onChange.bind(this)}></input>
        </div>
        <div className="form-group">
          <p><label htmlFor= {formKey}>{labelKey}</label></p>
          <input placeholder={this.state.newProduct.key} name= {formKey} type="text" className="form-control"
                 id= {formKey}
                 value={this.state.newProduct.key}
                 onChange={this.onChange.bind(this)}></input>
        </div>
        <div className="form-group">
          <label htmlFor= {formSlug}> {labelSlug}</label>
          <input placeholder={this.state.newProduct.slug} name= {formSlug} type="text" className="form-control"
                 id={formSlug}
                 value={this.state.newProduct.slug}
                 onChange={this.onChange.bind(this)}></input>
        </div>
        <p>
          <button onClick={this.onSave.bind(this)} type="button" className="btn btn-success">Добавить
          </button>
        </p>
      </form>
    )
  }

  onSave (event) {
    var result
    event.preventDefault()
    event.stopPropagation()
    fetch(`/api/product/`, {
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify(this.state.newProduct),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (this.props.button === 'panel' && res.status !== 200) {
        return window.location = '/#/panel/login'
      } else {
        return res.json()
      }
    })
      .then(data => {
        this.setState(previousState => {
          return {
            list: [...previousState.list, data]
          }
        })
      })
      .then(
        this.forceUpdate()
      )
      .then(
        this.setState(() => ({
          newProduct: {
            title: '',
            img: '',// '/public/img/product1.jpg',
            description: '',
            descriptionFull: '',
            price: 0,
            key: 0,
            slug: ''
          }
        })))
      .catch(error => {
        console.log(error)
      })
  }

  onChange (event) {
    event.preventDefault()
    event.stopPropagation()
    const name = event.target.name
    switch (name) {
      case formTitle:
        this.state.newProduct.title = event.target.value
        break
      case formIMG:
        this.state.newProduct.img = event.target.value
        break
      case formDescription:
        this.state.newProduct.description = event.target.value
        break
      case formDescriptionFull:
        this.state.newProduct.descriptionFull = event.target.value
        break
      case formKey :
        this.state.newProduct.key = event.target.value
        break
      case formPrice :
        this.state.newProduct.price = event.target.value
        break
      case formSlug :
        this.state.newProduct.slug = event.target.value
        break
      default :
        break
    }

    this.forceUpdate()
  }
}
