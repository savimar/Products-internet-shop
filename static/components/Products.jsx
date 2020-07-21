import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { HashRouter, Link } from 'react-router-dom'

export default class Products extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <main>
        <div className="container">
          <div className="content">
            <Breadcrumb/>
            {this.props.items.map((item, index) => (
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
            ))}
          </div>
        </div>
      </main>
    )
  }
}
