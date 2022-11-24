import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/general.scss';

const CreateWorkout = () => {
  const [excercises, setExcercises] = useState();

  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedExcercises, setSelectedExcercises] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleExcercises = (e) => {
      let curExcercises = selectedExcercises;
      if (curExcercises.includes(e.target.value)) {
        let index = curExcercises.indexOf(e.target.value);
        curExcercises.splice(index, 1);
      } else {
        curExcercises.push(e.target.value);
      }
      setSelectedExcercises(curExcercises);
    };

    fetch('/catalog/excercises')
      .then((res) => res.json())
      .then((data) =>
        setExcercises(
          data.map((excercise) => (
            <div className="checkbox-field" key={excercise._id}>
              <label htmlFor="excercise">{excercise.name}</label>
              <input
                type="checkbox"
                name="excercise"
                id={excercise._id}
                value={excercise._id}
                onChange={handleExcercises}
              />
            </div>
          ))
        )
      );
  }, [selectedExcercises]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const workout = {
      title: selectedTitle,
      excercises: selectedExcercises,
      description: selectedDescription,
    };

    fetch('/catalog/workout/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout),
    })
      .then((res) => {
        return res.json();
      })
      .then((newWorkout) => {
        console.log(newWorkout);
        navigate(`/workout/${newWorkout._id}`);
      });
  };

  return (
    <div className="create-workout-container">
      <h1>Create New Workout:</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="value-field">
          <label htmlFor="title">Title of Workout:</label>
          <input
            className="input-field"
            type="text"
            name="title"
            id="title"
            placeholder="Title of Workout"
            onChange={(e) => {
              setSelectedTitle(e.target.value);
            }}
            required
          />
        </div>
        <div className="value-field-">
          <p className="label">Excercises:</p>
          <div className="body-wrapper">
            <div className="excercises-container">{excercises}</div>
          </div>
        </div>
        <div className="value-field">
          <label htmlFor="description">Description:</label>
          <textarea
            className="input-field"
            id="description"
            placeholder="Description"
            name="description"
            onChange={(e) => {
              setSelectedDescription(e.target.value);
            }}
          />
        </div>
        <div className="btn-container">
          <button>Add Workout</button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkout;
