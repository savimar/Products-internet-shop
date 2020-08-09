import React from 'react'
import Breadcrumb from './Breadcrumb'
/*import jwt from 'jsonwebtoken'*/
const Cookie = require('cookie')
import decode from 'jwt-decode'

export default class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      status: this.checkCookie(),
      credentials: {
        login: 'admin@mail.con',
        password: '123456'
      }
    }

  }

  checkCookie () {
    try {
      const cookies = Cookie.parse(document.cookie);
      const payload = decode(cookies.token);
      // const payload = jwt.decode(cookies.token)
      const timestampInMilliseconds = new Date().getTime();
      const exp = (timestampInMilliseconds / 1000) < payload.exp;
      if (exp) {
        return 'logged';
      } else {
        return 'idle';
      }
    } catch (e) {
      return 'idle';
    }
  }

  onGetAuth (event) {
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
      return /*res.json()*/ res.status
    }).then(status => {
      if( status === 200){
        this.setState(() => ({
          status: 'logged'
        }))
      } else{
        this.setState(() => ({
          status: 'error'
        }))
      }

    }).catch(error => {
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

  onGoOut (event) {
    event.preventDefault()
    event.stopPropagation()
    document.cookie = 'token=; Path=/; Max-Age=0;'
    this.setState(() => ({
      status: 'igle'
    }))
    this.forceUpdate()
  }

  renderElement () {
    if (this.state.status === 'logged') {
      return (
        <div className="alert alert-success" role="alert">
          Авторизация успешна
        </div>
      )
    } else if (this.state.status === 'error') {
      return (
        <div className="alert alert-danger" role="alert">
          Ошибка авторизации. Введите логин и пароль еще раз.
        </div>
      )
    }

  }

  render () {
    if (this.state.status !== 'logged') {
      return this.getLoginForm()
    } else {
      return (
        <main>
          <div className="container">
            <div className="box">
              <div className="content">
                <Breadcrumb/>
                <div> {this.renderElement()}</div>
                <button className="btn btn-primary" onClick={this.onGoOut.bind(this)}>Выйти</button>
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
                <h2>Авторизация</h2>
                <div className="form-group">
                  <label htmlFor="login">E-mail</label>
                  <input placeholder='login' name="login" type="text" className="form-control"
                         id="login"
                         value={this.state.credentials.login}
                         onChange={this.onChange.bind(this)}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <input type="password" className="form-control" id="password" type="text"
                         value={this.state.credentials.password} placeholder="password"
                         onChange={this.onChange.bind(this)}></input>
                </div>
                <p>
                  <button type="button" className="btn btn-primary" onClick={this.onGetAuth.bind(this)}>Войти
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

