import { useEffect, useState } from 'react';
import Workout from './cards/Workout';
import '../styles/general.scss';

const Workouts = () => {
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    fetch('/catalog/workouts')
      .then((res) => res.json())
      .then((data) => setWorkoutData(data));
  }, []);

  return (
    <div className="workout-container">
      {workoutData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        workoutData.map((workout) => (
          <Workout
            key={workout._id}
            title={workout.title}
            excercises={workout.excercises}
            description={workout.description}
          />
        ))
      )}
    </div>
  );
};

export default Workouts;
