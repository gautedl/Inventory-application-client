import squat from '../../assets/images/squat.jpg';
import '../../styles/general.scss';
import { Link } from 'react-router-dom';

const Excercise = (props) => {
  return (
    <Link to={`/excercise/${props.id}`}>
      <div className="excercise-card">
        <div className="name-and-picture">
          <h2>{props.name}</h2>
          {props.img === '' ? (
            <img src={squat} alt={props.name} />
          ) : (
            <img src={props.img} alt={props.name} />
          )}
        </div>
        <div className="info-container">
          <h3>{props.category.name}</h3>
          <div className="body-parts">
            {props.bodyPart === []
              ? ''
              : props.bodyPart.map((part) => (
                  <h4 key={part._id}>{part.name}</h4>
                ))}
          </div>
          <span>{props.description}</span>
        </div>
      </div>
    </Link>
  );
};

export default Excercise;
