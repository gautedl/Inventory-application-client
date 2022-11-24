import '../styles/general.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-container">
      <Link to="/">
        <h3 className="nav-title">GYMB</h3>
      </Link>
      <div className="route-container">
        <Link to="/workout/create">
          <h3>Create Workout</h3>
        </Link>
        <Link to="/excercise/create">
          <h3>Create Excercise</h3>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
