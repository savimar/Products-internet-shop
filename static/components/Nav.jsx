import * as React from 'react'
import ReactDOM from 'react-dom'
import * as rrd from "react-router-dom";
export const Link = React.createContext(rrd.Link);


export default class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: -1
    }
  }


  toggle(tabIndex) {
    event.preventDefault();
    event.stopPropagation();
    this.setState(state => ({
      activeTab: tabIndex
    }));
  }


  render() {
    return (
      <div className={this.props.divClassName}>
      {this.props.tabs.map((tab, index) =>
        <a href='/' key={index} className={this.props.aClassName + ((index === this.state.activeTab) ? " active " : "")}
            onClick={this.toggle.bind(this, index)}
        > {tab} </a>
      )
      }
    </div>
    )
  }
}

