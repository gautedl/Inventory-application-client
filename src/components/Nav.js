import '../styles/general.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-container">
      <Link to="/">
        <h3 className="nav-title">GYMB</h3>
      </Link>
      <div className="route-container">
        <Link to="/workouts">
          <h3>Workouts</h3>
        </Link>
        <Link to="/excercises">
          <h3>Excercises</h3>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
