import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import decode from 'jwt-decode'

const Cookie = require('cookie')

export default class ProtectedRoute extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isAuthorized: this.getAuth()
    }
  }

  getAuth () {
    try {
      const cookies = Cookie.parse(document.cookie)
      const payload = decode(cookies.token)
      const timestampInMilliseconds = new Date().getTime()
      return (timestampInMilliseconds / 1000) < payload.exp
    } catch (e) {
      return false
    }
  }

  render () {
    return (
     this.state.isAuthorized ? (
       <Route { ...this.props  } exact path = { this.props.path } component= {this.props.component}/>
     ):(
       <Redirect to="/panel/login" from={ this.props.path } />
     )
    )
  }
}
