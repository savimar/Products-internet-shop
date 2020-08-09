import * as React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from '../components/Login'


export default class LoginPage extends React.Component {

  render () {
    return (
      <React.Fragment>
        <Header css={'headerPanel'}/>
        <Login/>
        <Footer/>
      </React.Fragment>
    )
  }
}

