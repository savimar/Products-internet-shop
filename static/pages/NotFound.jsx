import React from 'react'
import Breadcrumb from '../components/Breadcrumb'

export default class ProductPage extends React.Component {
  render () {
    return (
      <main>
        <div className="container">
          <div className="box">
            <div className="content">
              <Breadcrumb/>
              Not found
            </div>
          </div>
        </div>
      </main>
    )
  }
}
