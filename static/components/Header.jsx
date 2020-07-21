import * as React from 'react';
import ReactDOM from 'react-dom';
import * as rrd from "react-router-dom";
export const Link = React.createContext(rrd.Link);
import Nav from './Nav';


export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="col-8 offset-2 col-sm-10 offset-sm-1 content">
           <Nav tabs={["Услуги", "Цены", "О компании", "Контакты"]} divClassName="col-12 col-md-9 menu"
               aClassName="itemMenu"/>;
         </div>
      </header>
    );
  }
}
