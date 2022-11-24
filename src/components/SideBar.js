import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/general.scss';

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState();
  const [bodyParts, setBodyParts] = useState();

  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetch('/catalog/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(
          data.map((category) => (
            <Link key={category._id} to={`/category/${category._id}`}>
              <p>-{category.name}</p>
            </Link>
          ))
        );
      });

    fetch('/catalog/body_parts')
      .then((res) => res.json())
      .then((data) =>
        setBodyParts(
          data.map((bodyPart) => (
            <Link key={bodyPart._id} to={`/body_part/${bodyPart._id}`}>
              <p>-{bodyPart.name}</p>
            </Link>
          ))
        )
      );
  }, []);

  return (
    <div className={open ? 'sidenav' : 'sidenavClosed'}>
      <button className="menuBtn" onClick={toggleOpen}>
        X
      </button>
      <div>
        <Link className="sideitem" to="/excercises">
          {/* <img src="" alt="" /> */}
          <p className={open ? 'linkText' : 'linkTextClosed'}>Excercises</p>
        </Link>
        <Link className="sideitem" to="/workouts">
          {/* <img src="" alt="" /> */}
          <p className={open ? 'linkText' : 'linkTextClosed'}>Workouts</p>
        </Link>
        <div className="sideitem">
          <p className={open ? 'linkText' : 'linkTextClosed'}>Categories:</p>
        </div>
        <div className={open ? 'categories' : 'categoriesClosed'}>
          {categories}
        </div>
        <div className="sideitem">
          <p className={open ? 'linkText' : 'linkTextClosed'}>Body Parts:</p>
        </div>
        <div className={open ? 'categories' : 'categoriesClosed'}>
          {bodyParts}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
