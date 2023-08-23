import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {

    // const onAddTask = (e) => {
    //     console.log(e)
    // }

  return (
    <button onClick={props.onClick} className='btn' style={{backgroundColor: props.color}} >{props.text}</button>
  )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}

export default Button
