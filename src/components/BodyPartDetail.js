import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Excercise from './cards/Excercise';
import '../styles/general.scss';

const BodyPartDetail = () => {
  const { id } = useParams();
  const [bodyPart, setBodyPart] = useState();
  const [excercises, setExcercises] = useState([]);

  useEffect(() => {
    fetch(`/catalog/body_part/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBodyPart(data['body_part'].name);
        setExcercises(
          data.excercises.map((excercise) => (
            <Excercise
              name={excercise.name}
              category={excercise.category}
              bodyPart={excercise['body_part']}
              description={excercise.description}
              img={excercise['img_url']}
              key={excercise._id}
              id={excercise._id}
            />
          ))
        );
      });
  }, [id]);
  return (
    <div className="body-part-section">
      {bodyPart === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h1>{bodyPart}</h1>
          </div>
          <div className="excercise-section">{excercises}</div>
        </>
      )}
    </div>
  );
};

export default BodyPartDetail;
