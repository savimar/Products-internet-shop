import React from "react";

export default class ProductBox extends React.Component {
  render() {
    return
    <div className="product">
      <h5>{ this.props.title }</h5>
      { this.props.children }
    </div>;
  }
}


