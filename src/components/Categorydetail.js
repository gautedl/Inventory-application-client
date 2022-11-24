import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Excercise from './cards/Excercise';
import '../styles/general.scss';

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState();
  const [excercises, setExcercises] = useState([]);

  useEffect(() => {
    fetch(`/catalog/category/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.category.name);
        setExcercises(
          data.excercises.map((excercise) => (
            <Excercise
              name={excercise.name}
              category={excercise.category}
              bodyPart={excercise['body_part']}
              description={excercise.description}
              key={excercise._id}
              id={excercise._id}
            />
          ))
        );
      });
  }, [id]);
  return (
    <div className="category-section">
      {category === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <h1>{category}</h1>
          </div>
          <div className="excercise-section">{excercises}</div>
        </>
      )}
    </div>
  );
};

export default CategoryDetail;
