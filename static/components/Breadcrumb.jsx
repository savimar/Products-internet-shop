import React from 'react'
import { HashRouter, Link } from 'react-router-dom'

export default class Breadcrumb extends React.Component {
  render () {
    return (
      <nav className="breadcrumb">
        <HashRouter>
          <Link className="breadcrumb-item active" to="/">Домой</Link>
        </HashRouter>
      </nav>
    )
  }
}

