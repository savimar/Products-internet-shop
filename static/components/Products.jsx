import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { HashRouter, Link } from 'react-router-dom'

export default class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      status: 'idle',
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
        }, 1000)
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
    } else if (this.state.status === 'error') {
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
      </main>
    )

  }

  addNewProduct () {
    return (
      <form>
        <p><h2>Добавление нового товара</h2></p>
        <div className="form-group">
          <p><label htmlFor="formGroupExampleInput">Введите новое наименование товара</label></p>
          <input placeholder={this.state.newProduct.title} name="title" type="text" className="form-control"
                 id="title"
                 value={this.state.newProduct.title}
                 onChange={this.onChange.bind(this)}></input>
        </div>
        <div className="form-group">
          <p><label htmlFor="formGroupExampleInput">Введите новый путь к изображению товара</label></p>
          <input placeholder={this.state.newProduct.img} name="img" type="text" className="form-control"
                 id="img"
                 value={this.state.newProduct.img}
                 onChange={this.onChange.bind(this)}></input>
        </div>

        <div className="form-group">
          <p><label htmlFor="exampleFormControlTextarea1">Введите новое краткое описание товара</label></p>
          <textarea placeholder={this.state.newProduct.description}
                    name="description" className="form-control"
                    id="description"
                    rows="2"
                    value={this.state.newProduct.description}
                    onChange={this.onChange.bind(this)}></textarea>
        </div>


        <div className="form-group">
          <p><label htmlFor="exampleFormControlTextarea1">Введите новое полное описание товара</label></p>
          <textarea placeholder={this.state.newProduct.descriptionFull}
                    name="descriptionFull" className="form-control"
                    id="descriptionFull"
                    rows="3"
                    value={this.state.newProduct.descriptionFull}
                    onChange={this.onChange.bind(this)}></textarea>
        </div>
        <div className="form-group">
          <p><label htmlFor="formGroupExampleInput">Введите цену товара (только число)</label></p>
          <input placeholder={this.state.newProduct.price} name="price" type="text" className="form-control"
                 id="price"
                 value={this.state.newProduct.price}
                 onChange={this.onChange.bind(this)}></input>
        </div>
        <div className="form-group">
          <p><label htmlFor="formGroupExampleInput">Введите числовой ключ товара</label></p>
          <input placeholder={this.state.newProduct.key} name="key" type="text" className="form-control"
                 id="key"
                 value={this.state.newProduct.key}
                 onChange={this.onChange.bind(this)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Введите ключевое наименование товара</label>
          <input placeholder={this.state.newProduct.slug} name="slug" type="text" className="form-control"
                 id="slug"
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
      body: JSON.stringify(this.state.newProduct),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      res.json()
    })
      .then(data => { //data=== undefined, but PromiseValue is correct
        /*this.setState(() => ({
          list:  this.state.list.push(data)
        }))*/
        this.setState(() => ({
          newProduct: {
            title: '',
            img:'',// '/public/img/product1.jpg',
            description: '',
            descriptionFull: '',
            price: 0,
            key: 0,
            slug: ''
          }
        }))
      })
      .then(
        this.renderProducts())
      .then(
        this.forceUpdate())
      .catch(error => {
        console.log(error)
      })
  }

  onChange (event) {
    event.preventDefault()
    event.stopPropagation()
    const name = event.target.name
    switch (name) {
      case 'title':
        this.state.newProduct.title = event.target.value
        break
      case 'img':
        this.state.newProduct.img = event.target.value
        break
      case 'description':
        this.state.newProduct.description = event.target.value
        break
      case 'descriptionFull':
        this.state.newProduct.descriptionFull = event.target.value
        break
      case 'key' :
        this.state.newProduct.key = event.target.value
        break
      case 'price' :
        this.state.newProduct.price = event.target.value
        break
      case 'slug' :
        this.state.newProduct.slug = event.target.value
        break
      default :
        break
    }

    this.forceUpdate()
  }
}
