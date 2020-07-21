import React from "react";
import { HashRouter, BrowserRouter, Link, Router } from 'react-router-dom'

export default class Breadcrumb extends React.Component {
  render() {
    return (
       <nav className="breadcrumb">
         <HashRouter>
         <Link className="breadcrumb-item active" to ="/" >Домой</Link>
       </HashRouter>
      </nav>
    );
  }
}

