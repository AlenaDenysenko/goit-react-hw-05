import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies" activeClassName="active">Movies</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;



