import React from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: -1
    }
  }

  toggle (tabIndex) {
    event.preventDefault()
    event.stopPropagation()
    this.setState(state => ({
      activeTab: tabIndex
    }))
  }

  render () {
    return (<div className={this.props.divClassName}> {
      this.props.tabs.map((tab, index) =>
        <Link to key={index}
           className={
             this.props.aClassName + ((index === this.state.activeTab) ? ' active ' : '')
           }
           onClick={
             this.toggle.bind(this, index)
           }
           href="#"> {
          tab
        } </Link>
      )
    } </div>)
  }
}


