import React from 'react'
import Breadcrumb from './Breadcrumb'
import { Redirect, Router } from 'react-router'
//import { HashRouter } from 'react-router-dom'
import { createBrowserHistory, createHashHistory } from 'history'
import { HashRouter, Link } from 'react-router-dom'

export default class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      status: 'idle',
      credentials: {
        login: 'admin@mail.con',
        password: '123456'
      }
    }
  }

  onSave (event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState(state => ({
      status: 'pending'
    }))
    fetch(`/api/login/`, {
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify(this.state.credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    }).then(prod => {
      /*this.setState(() => ({
        credentials :{login : prod.email}
      }))
      console.log(this.state.credentials);*/
       this.setState(() => ({
        status: 'logged'
      }))
        console.log(this.state.status)

    }) .catch(error => {
     //   console.log(error)
        this.setState(() => ({
          status: 'error'
        }))
      })
  }

  onChange (event) {
    event.preventDefault()
    event.stopPropagation()
    const name = event.target.name
    switch (name) {
      case 'login':
        this.state.credentials.login = event.target.value
        break
      case 'password':
        this.state.credentials.password = event.target.value
        break

      default :
        break
    }

    this.forceUpdate()
  }

  renderElement () {
    console.log(this.state.status)
    if (this.state.status === 'logged') {
      return (
        <div className="alert alert-success" role="alert">
          Авторизация успешна
        </div>
      )
    } else if (this.state.status === 'error') {
      return (
        <div className="alert alert-danger" role="alert">
          Ошибка авторизации
        </div>
      )
    }

  }

  render () {
    if (this.state.status !== 'logged') {
      return this.getLoginForm()
    } else {
      return(
      <main>
        <div className="container">
          <div className="box">
            <div className="content">
              <HashRouter>
              <Breadcrumb/>
              {this.renderElement()}
                <Link className="btn btn-primary" to={'/panel'}>Войти в панель управления</Link>
              </HashRouter>
            </div>
          </div>
        </div>
      </main>
      )
    }

  }

  getLoginForm () {
    return (
      <main>
        <div className="container">
          <div className="box">
            <div className="content">
              <Breadcrumb/>
              {
                this.renderElement()
              }
              <form>
                <p><h2>Авторизация</h2></p>
                <div className="form-group">
                  <label htmlFor="login">E-mail</label>
                  <input placeholder='login' name="login" type="text" className="form-control"
                         id="login"
                         value={this.state.credentials.login}
                         onChange={this.onChange.bind(this)}></input>
                </div>
                <div class="form-group">
                  <label htmlFor="password">Пароль</label>
                  <input type="password" className="form-control" id="password" type="text"
                         value={this.state.credentials.password} placeholder="password"
                         onChange={this.onChange.bind(this)}></input>
                </div>
                <p>
                  <button type="button" className="btn btn-primary" onClick={this.onSave.bind(this)}>Войти
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }

}

