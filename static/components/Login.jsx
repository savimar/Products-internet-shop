import React from 'react'
import Breadcrumb from './Breadcrumb'
const Cookie = require('cookie')
import decode from 'jwt-decode'

const path = '/api/login/'
const authSuccessful = 'Авторизация успешна';
const authFailed = 'Ошибка авторизации. Введите логин и пароль еще раз.'
const statusIdle = 'idle';
const statusPending = 'pending';
const statusLogged = 'logged';
const statusError = 'error';
const caption = 'Авторизация';
const login = 'admin@mail.con';
const password = '123456';
const millisecondsToSeconds = 1000;
const statusCodeOK = 200;
const labelEmail = 'E-mail';
const labelPassword = 'Пароль';
const buttonIn = 'Войти';
const buttonOut = 'Выйти';
const cookieClear = 'token=; Path=/; Max-Age=0;'
const formLogin = 'login';
const formPassword = 'password';

export default class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      status: this.checkCookie(),
      credentials: {
        login: login,
        password: password
      }
    }

  }

  checkCookie () {
    try {
      const cookies = Cookie.parse(document.cookie);
      const payload = decode(cookies.token);
      const timestampInMilliseconds = new Date().getTime();
      const exp = (timestampInMilliseconds / millisecondsToSeconds) < payload.exp;
      if (exp) {
        return  statusLogged;
      } else {
        return statusIdle;
      }
    } catch (e) {
      return statusIdle;
    }
  }

  onGetAuth (event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState(state => ({
      status: statusPending
    }))
    //sending request to auth, response - status code
    fetch(path, {
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify(this.state.credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.status
    }).then(status => {
      if( status === statusCodeOK){
        this.setState(() => ({
          status:  statusLogged
        }))
      } else{
        this.setState(() => ({
          status: statusError
        }))
      }

    }).catch(error => {
      this.setState(() => ({
        status: statusError
      }))
    })
  }
//changing data on a form
  onChange (event) {
    event.preventDefault()
    event.stopPropagation()
    const name = event.target.name
    switch (name) {
      case formLogin:
        this.state.credentials.login = event.target.value
        break
      case formPassword:
        this.state.credentials.password = event.target.value
        break

      default :
        break
    }

    this.forceUpdate()
  }
//exit authorization using the button
  onGoOut (event) {
    event.preventDefault()
    event.stopPropagation()
    document.cookie = cookieClear
    this.setState(() => ({
      status: statusIdle
    }))
    this.forceUpdate()
  }
//alert
  renderElement () {
    if (this.state.status ===  statusLogged) {
      return (
        <div className="alert alert-success" role="alert">
          {authSuccessful}
        </div>
      )
    } else if (this.state.status === statusError) {
      return (
        <div className="alert alert-danger" role="alert">
          {authFailed}
        </div>
      )
    }

  }

  render () {
    if (this.state.status !==  statusLogged) {
      return this.getLoginForm()
    } else {
      return (
        <main>
          <div className="container">
            <div className="box">
              <div className="content">
                <Breadcrumb/>
                <div> {this.renderElement()}</div>
                <button className="btn btn-primary" onClick={this.onGoOut.bind(this)}>{buttonOut}</button>
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
              <div>{
                this.renderElement()
              }
              </div>
              <form>
                <h2>{caption}</h2>
                <div className="form-group">
                  <label htmlFor={formLogin}>{labelEmail}</label>
                  <input placeholder= {formLogin} name= {formLogin} type="text" className="form-control"
                         id={formLogin}
                         value={this.state.credentials.login}
                         onChange={this.onChange.bind(this)}></input>
                </div>
                <div className="form-group">
                  <label htmlFor={formPassword}>{labelPassword}</label>
                  <input type={formPassword} className="form-control" id= {formPassword} type="text"
                         value={this.state.credentials.password} placeholder={formPassword}
                         onChange={this.onChange.bind(this)}></input>
                </div>
                <p>
                  <button type="button" className="btn btn-primary" onClick={this.onGetAuth.bind(this)}>{buttonIn}
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

