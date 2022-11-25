import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/general.scss';

const CreateExcercise = () => {
  const [categories, setCategories] = useState();
  const [bodyParts, setBodyParts] = useState();

  const [selectedName, setSelectedName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleBodyParts = (e) => {
      let curParts = selectedBodyParts;
      if (curParts.includes(e.target.value)) {
        let index = curParts.indexOf(e.target.value);
        curParts.splice(index, 1);
      } else {
        curParts.push(e.target.value);
      }

      setSelectedBodyParts(curParts);
    };

    fetch('/catalog/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setSelectedCategory(data[0]._id);
      });

    fetch('/catalog/body_parts')
      .then((res) => res.json())
      .then((data) =>
        setBodyParts(
          data.map((bodyPart) => (
            <div className="checkbox-field" key={bodyPart._id}>
              <label htmlFor="bodyPart">{bodyPart.name}</label>
              <input
                type="checkbox"
                name="bodyPart"
                id={bodyPart._id}
                value={bodyPart._id}
                onChange={handleBodyParts}
              />
            </div>
          ))
        )
      );
  }, [selectedBodyParts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const excercise = {
      name: selectedName,
      category: selectedCategory,
      description: selectedDescription,
      body_part: selectedBodyParts,
    };

    fetch('/catalog/excercise/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(excercise),
    })
      .then((res) => {
        return res.json();
      })
      .then((newExcercise) => {
        console.log(newExcercise);
        navigate(`/excercise/${newExcercise._id}`);
      });
  };

  return (
    <div className="create-excercise-container">
      {categories === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Create New Excercise:</h1>
          <form className="create-form" onSubmit={handleSubmit}>
            <div className="value-field">
              <label htmlFor="name">Name of Excercise:</label>
              <input
                className="input-field"
                type="text"
                name="name"
                id="name"
                placeholder="Name of Excercise"
                onChange={(e) => {
                  setSelectedName(e.target.value);
                }}
                required
              />
            </div>
            <div className="value-field-category">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                type="select"
                placeholder="Select Category"
                name="category"
                defaultValue={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
                required
              >
                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    name="category"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="value-field-">
              <p className="label">Body Part(s):</p>
              <div className="body-wrapper">
                <div className="body-parts-container">{bodyParts}</div>
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
              <button>Add Excercise</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateExcercise;
