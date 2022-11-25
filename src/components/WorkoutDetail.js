import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import squat from './../assets/images/squat.jpg';
import '../styles/general.scss';

const WorkoutDetail = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState([]);
  const [excercises, setExcercises] = useState([]);

  useEffect(() => {
    fetch(`/catalog/workout/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setExcercises(
          data.excercises.map((excercise) => (
            <Link key={excercise._id} to={`/excercise/${excercise._id}`}>
              {excercise.name}
            </Link>
          ))
        );
      });
  }, [id]);

  return (
    <div className="workout-detail-container">
      {workout.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="title-picture">
            <h1>{workout.title}</h1>
            <img alt={workout.title} src={squat} />
          </div>
          <div className="info-container">
            <h2>Excercises</h2>
            <div className="excercises">{excercises}</div>
            <h3>Description</h3>
            <p>{workout.description}</p>
          </div>
          <div className="btn-container">
            <Link to={`/workout/${id}/update`}>Update Workout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkoutDetail;
