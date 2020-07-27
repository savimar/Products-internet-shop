import * as React from 'react'
import Breadcrumb from './Breadcrumb'
import { HashRouter} from 'react-router-dom'

let path

export default class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [],
      item: {
        title: 'Товар 1'
      }
    }
    this.getPath()
  }

   getPath () {
    if (this.props.prodKey !== undefined && this.props.prodKey !== null) {
      path = '/api/product?key=' + this.props.prodKey;
    } else if (this.props.prodId !== undefined && this.props.prodId !== null) {
      path = '/api/product?id=' + this.props.prodId;
    } else {
      path = '/api/product?slag=bag';
    }

  }

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
    event.preventDefault();
    event.stopPropagation();
    this.state.item.title = event.target.value
    this.forceUpdate()
  }

  getEditProducts (products) {
    return (
      <React.Fragment>
        {products && products.length ? (
            products.map((item, index) => (
              <HashRouter>
              <form key={index}>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Введите наименование товара</label>
                  <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Товар"
                         value={this.state.item.title}
                         onChange={this.onChange.bind(this)}></input>
                </div>
              </form>
          <h5 className="card-title">{this.state.item.title}</h5>
          <img className="card-img-top" src={item.img} alt="img"></img>
          <p className="card-text">{item.descriptionFull}</p>
          <p className="card-text"> Цена {item.price} руб.</p>
          <a href="#" className="btn btn-primary">Купить</a>
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
                this.getEditProducts(products)
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




