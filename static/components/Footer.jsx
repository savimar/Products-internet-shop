import React from 'react'

const year = '2020'
const copyright = '&#169; СCodery.camp' + year
export default class Footer extends React.Component {
  render () {
    return (
      <footer>
        <div>
          {copyright}
        </div>
      </footer>
    )
  }
}

