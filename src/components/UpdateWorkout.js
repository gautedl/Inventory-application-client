import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateWorkout = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState([]);
  const [currentExcercises, setCurrentExcercises] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [excercises, setExcercises] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState();
  const [selectedPassword, setSelectedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/catalog/workout/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        // setCurrentExcercises(data.excercises._id);
        setSelectedDescription(data.description);
        setSelectedTitle(data.title);
      });

    fetch(`/catalog/excercises`)
      .then((res) => res.json())
      .then((data) => {
        setExcercises(data);
      });
  }, [id]);

  const handleExcercises = (e) => {
    let curExcercises = currentExcercises;
    if (curExcercises.includes(e.target.value)) {
      let index = curExcercises.indexOf(e.target.value);
      curExcercises.splice(index, 1);
    } else {
      curExcercises.push(e.target.value);
    }
    setCurrentExcercises(curExcercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedWorkout = {
      title: selectedTitle,
      excercises: currentExcercises,
      description: selectedDescription,
      password: selectedPassword,
    };

    fetch(`/catalog/workout/${id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedWorkout),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 'Wrong Password') {
          setErrorMessage(<p className="error">Wrong password</p>);
          return;
        } else {
          navigate(`/workout/${id}`);
        }
      });
  };

  return (
    <div className="create-workout-container">
      {workout.length === 0 || excercises.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Create New Workout:</h1>
          <form className="create-form">
            <div className="value-field">
              <label htmlFor="title">Title of Workout:</label>
              <input
                className="input-field"
                type="text"
                name="title"
                id="title"
                placeholder="Title of Workout"
                value={selectedTitle}
                onChange={(e) => {
                  setSelectedTitle(e.target.value);
                }}
                required
              />
            </div>
            <div className="value-field-">
              <p className="label">Excercises:</p>
              <div className="body-wrapper">
                <div className="excercises-container">
                  {excercises.map((excercise) =>
                    !currentExcercises.includes(excercise._id) ? (
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
                    ) : (
                      <div className="checkbox-field" key={excercise._id}>
                        <label htmlFor="excercise">{excercise.name}</label>
                        <input
                          type="checkbox"
                          name="excercise"
                          id={excercise._id}
                          value={excercise._id}
                          onChange={handleExcercises}
                          //   checked={true} NEED TO FIGURE OUT A WAY TO HANDLE THIS STATE
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="value-field">
              <label htmlFor="description">Description:</label>
              <textarea
                className="input-field"
                id="description"
                placeholder="Description"
                name="description"
                value={selectedDescription}
                onChange={(e) => {
                  setSelectedDescription(e.target.value);
                }}
              />
            </div>
            <div className="password-field">
              <input
                className="password"
                placeholder="Password"
                type="password"
                onChange={(e) => setSelectedPassword(e.target.value)}
              />
            </div>
            <div className="password-field">{errorMessage}</div>
            <div className="btn-container">
              <button onClick={handleSubmit}>Update Workout</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateWorkout;
