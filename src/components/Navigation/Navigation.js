import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';

const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink exact to={routes.homePage}>
          HomePage
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.moviesPage}>MoviesPage</NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
