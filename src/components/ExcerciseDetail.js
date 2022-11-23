import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import squat from './../assets/images/squat.jpg';
import '../styles/general.scss';

const ExcerciseDetail = () => {
  const { id } = useParams();
  const [excercise, setExcersise] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    fetch(`/catalog/excercise/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExcersise(data);
        setBodyParts(
          data['body_part'].map((bodyPart) => <p>{bodyPart.name}</p>)
        );
      });
  }, [id]);

  return (
    <>
      {excercise.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="excercise-detail-container">
          <div className="title-picture">
            <h1>{excercise.name}</h1>
            <img alt={excercise.name} src={squat} />
          </div>
          <div className="info-container">
            <h3>Category</h3>
            <p>{excercise.category.name}</p>
            {bodyParts.length === 0 ? (
              <></>
            ) : bodyParts.length > 1 ? (
              <h3>Body Parts</h3>
            ) : (
              <h3>Body Part</h3>
            )}
            <div className="body-parts">{bodyParts}</div>
            <h4>Description</h4>
            <p>{excercise.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ExcerciseDetail;
