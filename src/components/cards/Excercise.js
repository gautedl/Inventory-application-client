import squat from '../../assets/images/squat.jpg';
import '../../styles/general.scss';

const Excercise = (props) => {
  return (
    <div className="excercise-card">
      {console.log(props)}
      <div className="name-and-picture">
        <h2>{props.name}</h2>
        <img src={squat} alt={props.name} />
      </div>
      <div className="info-container">
        <h3>{props.category.name}</h3>
        <div className="body-parts">
          {props.bodyPart === []
            ? ''
            : props.bodyPart.map((part) => <h4 key={part._id}>{part.name}</h4>)}
        </div>
        <span>{props.description}</span>
      </div>
    </div>
  );
};

export default Excercise;