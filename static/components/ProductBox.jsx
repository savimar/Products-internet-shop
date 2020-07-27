import * as React from 'react'
import Breadcrumb from './Breadcrumb'
import { HashRouter } from 'react-router-dom'

let path

export default class Products extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      products: [],
      item: {
        title: 'Товар',
        descriptionFull: 'Описание',
        key :'1',
        slug :'bag'
      }
    }
    this.getPath()
  }

  getPath () {
    if (this.props.prodKey !== undefined && this.props.prodKey !== null) {
      path = '/api/product?key=' + this.props.prodKey
    } else if (this.props.prodId !== undefined && this.props.prodId !== null) {
      path = '/api/product?id=' + this.props.prodId
    } else {
      path = '/api/product?slag=bag'
    }

  }

  getProducts(products) {
    return (
      <React.Fragment>
        {products && products.length ? (
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
      </React.Fragment>
    )
  }

  onChange (event) {
    event.preventDefault()
    event.stopPropagation()
    const name = event.target.name;
    console.log(name);
    //var property = {...this.state.item}
    switch (name) {
      case 'title':
        this.state.item.title = event.target.value
      break;
      case 'descriptionFull':
        this.state.item.descriptionFull = event.target.value;
        break;
      case 'key' :
        this.state.item.key =  event.target.value;
        break;
      case 'slug' :
        this.state.item.slug = event.target.value;
        break;
      default :
        break;
    }

    this.forceUpdate()
  }

  renderForm(products) {


    return (
      <React.Fragment>
        {products && products.length ? (
          products.map((item, index) => (
            <HashRouter>

              <form key={index}>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Введите наименование товара</label>
                  <input name="title" type="text" className="form-control"
                         id="formGroupExampleInput"
                         placeholder="Товар"
                         value={this.state.item.title}
                         onChange={this.onChange.bind(this)}></input>
                </div>
                <h5 className="card-title">{this.state.item.title}</h5>
                <img className="card-img-top" src={item.img} alt="img"></img>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Введите полное описание товара</label>
                  <textarea name="descriptionFull" className="form-control"
                            id="exampleFormControlTextarea1"
                            placeholder="Описание" rows="3"
                            value={this.state.item.descriptionFull}
                            onChange={this.onChange.bind(this)}></textarea>
                </div>
                <p className="card-text">{this.state.item.descriptionFull}</p>
                <p className="card-text"> Цена {item.price} руб.</p>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Введите ключ товара</label>
                  <input name="key" type="text" className="form-control"
                         id="formGroupExampleInput"
                         placeholder="Товар"
                         value={this.state.item.key}
                         onChange={this.onChange.bind(this)}></input>
                </div>
                <p className="card-text"> {this.state.item.key}</p>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Введите ключевое наименование товара</label>
                  <input name="slug" type="text" className="form-control"
                         id="formGroupExampleInput"
                         placeholder="Товар"
                         value={this.state.item.slug}
                         onChange={this.onChange.bind(this)}></input>
                </div>
                <p className="card-text"> {this.state.item.slug}</p>
                <a href="#" className="btn btn-primary">Купить</a>
              </form>
            </HashRouter>)
          )) : (
          <div>
            <h4>Идет поиск товара</h4>
          </div>
        )
        }
      </React.Fragment>
    )
  }

  renderProduct () {
    return (
      fetch(path)
        .then(res => res.json())
        .then(product => this.setState(() => ({
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




