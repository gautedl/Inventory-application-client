import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import squat from './../assets/images/squat.jpg';
import '../styles/general.scss';

const WorkoutDetail = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState([]);
  const [excercises, setExcercises] = useState([]);
  const [tryDelete, setTryDelete] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

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

  const deleteWorkout = (e) => {
    e.preventDefault();
    const params = {
      password: selectedPassword,
    };

    fetch(`/catalog/workout/${id}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 'Wrong Password') {
          setErrorMessage(<p className="error">Wrong password</p>);
          return;
        } else navigate('/workouts');
      });
  };

  return (
    <div className="workout-detail-container">
      {workout.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="title-picture">
            <h1>{workout.title}</h1>
            {workout['img_url'] === undefined ? (
              <img src={squat} alt={workout.name} />
            ) : (
              <img src={workout['img_url']} alt={workout.name} />
            )}
          </div>
          <div className="info-container">
            <h2>Excercises</h2>
            <div className="excercises">{excercises}</div>
            <h3>Description</h3>
            <p>{workout.description}</p>
          </div>
          <div className="btn-container">
            <Link to={`/workout/${id}/update`}>Update Workout</Link>
            <button onClick={() => setTryDelete(true)}>Delete Workout</button>
          </div>
          {tryDelete && (
            <>
              <div>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setSelectedPassword(e.target.value)}
                />
                <button onClick={deleteWorkout}>Delete</button>
              </div>
              {errorMessage}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default WorkoutDetail;
