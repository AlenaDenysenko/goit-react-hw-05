import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink exact to="/" activeClassName={styles.activeLink}>
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" activeClassName={styles.activeLink}>
            Пошук фільмів
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
