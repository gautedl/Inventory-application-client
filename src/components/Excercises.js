import { useEffect, useState } from 'react';
import Excercise from './cards/Excercise';
import '../styles/general.scss';

const Excercises = () => {
  const [excerciseData, setExcerciseData] = useState([]);

  useEffect(() => {
    fetch('/catalog/excercises')
      .then((res) => res.json())
      .then((data) => setExcerciseData(data));
  }, []);

  return (
    <div className="excercise-container">
      {excerciseData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        excerciseData.map((excercise, i) => (
          <Excercise
            name={excercise.name}
            category={excercise.category}
            bodyPart={excercise['body_part']}
            description={excercise.description}
            key={excercise._id}
            id={excercise._id}
          />
        ))
      )}
    </div>
  );
};

export default Excercises;
