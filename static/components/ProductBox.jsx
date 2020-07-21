import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'

export default class Products extends React.Component {
  constructor (props) {
    super(props);
    }




  render () {
    return (
      <main>
          <Breadcrumb />
            <div className="container">
          <div className="box">
            <div className="content">
                <h5 className="card-title">{this.props.item.title}</h5>
                <img className="card-img-top" src={this.props.item.img} alt="img"/>
                <p className="card-text">{this.props.item.descriptionFull}</p>
                <p className="card-text"> Цена {this.props.item.price} руб.</p>
                <a href="#" className="btn btn-primary">Купить</a>
             </div>
          </div>
        </div>
      </main>
    )
  }
}




