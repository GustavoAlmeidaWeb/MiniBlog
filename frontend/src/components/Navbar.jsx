import { useNavigate, NavLink } from 'react-router-dom';
import React from 'react'

const NavBar = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/register'>Cadastrar-se</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
