import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import squat from './../assets/images/squat.jpg';
import '../styles/general.scss';

const ExcerciseDetail = () => {
  const { id } = useParams();
  const [excercise, setExcersise] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [tryDelete, setTryDelete] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/catalog/excercise/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExcersise(data);
        setBodyParts(
          data['body_part'].map((bodyPart) => (
            <Link to={`/body_part/${bodyPart._id}`} key={bodyPart.name}>
              {bodyPart.name}
            </Link>
          ))
        );
      });
  }, [id]);

  const deleteExcercise = (e) => {
    e.preventDefault();
    const params = {
      password: selectedPassword,
    };

    fetch(`/catalog/excercise/${id}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 'Wrong Password') {
          setErrorMessage(<p className="error">Wrong password</p>);
          return;
        } else navigate('/excercises');
      });
  };

  return (
    <div className="excercise-detail-container">
      {excercise.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="title-picture">
            <h1>{excercise.name}</h1>
            {excercise['img_url'] === undefined ||
            excercise['img_url'] === '' ? (
              <img src={squat} alt={excercise.name} />
            ) : (
              <img src={excercise['img_url']} alt={excercise.name} />
            )}
          </div>
          <div className="info-container">
            <h3>Category</h3>
            <Link to={`/category/${excercise.category._id}`}>
              {excercise.category.name}
            </Link>
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
          <div className="btn-container">
            <Link to={`/excercise/${id}/update`}>Update Excercise</Link>
            <button onClick={() => setTryDelete(true)}>Delete Excercise</button>
          </div>
          {tryDelete && (
            <>
              <div>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setSelectedPassword(e.target.value)}
                />
                <button onClick={deleteExcercise}>Delete</button>
              </div>
              {errorMessage}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ExcerciseDetail;
