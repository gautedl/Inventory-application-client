import { useEffect, useMemo, useState } from 'react';
import squat from '../../assets/images/squat.jpg';
import '../../styles/general.scss';
import { Link } from 'react-router-dom';

const Workout = (props) => {
  const [uniqueBodyParts, setUniqueBodyParts] = useState([]);

  const bodyParts = useMemo(
    () => [...new Set(props.excercises.map((item) => item['body_part']))],
    [props.excercises]
  );

  const categories = [
    ...new Set(props.excercises.map((item) => item.category.name)),
  ];

  useEffect(() => {
    const tempBodyParts = [];

    for (let i = 0; i < bodyParts.length; i++) {
      for (let j = 0; j < bodyParts[i].length; j++) {
        if (!tempBodyParts.includes(bodyParts[i][j].name)) {
          tempBodyParts.push(bodyParts[i][j].name);
        }
      }
    }

    setUniqueBodyParts(tempBodyParts);
  }, [bodyParts]);

  return (
    <Link to={`/workout/${props.id}`}>
      <div className="workout-card">
        <div className="name-and-picture">
          <h2>{props.title}</h2>
          <img src={squat} alt={props.title} />
        </div>
        <div className="info-container">
          <div className="categories">
            <h3 className="info-title">Categories</h3>
            <p>{categories.map((category) => category).join(', ')}</p>
          </div>
          <div className="body_parts">
            <h3 className="info-title">Body Parts</h3>
            <p>{uniqueBodyParts.map((bodyPart) => bodyPart).join(', ')}</p>
          </div>
          <div className="description">
            <h3 className="info-title">Description</h3>
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Workout;
