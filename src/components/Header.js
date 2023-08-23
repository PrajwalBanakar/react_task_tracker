import PropTypes from 'prop-types'
import Button from './Button'



const Header = (props) => {

  return (
    <header className='header'>
      <h1>{props.title}</h1>
      <Button color={props.showAdd ? 'red' : 'blue'} text={props.showAdd ? 'Close' : 'Add'} onClick={props.onShowAddTask}/>
    </header>
  )
}

Header.defaultProps = {
  title: 'Default title',
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header

