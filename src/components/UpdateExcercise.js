import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/general.scss';

const UpdateExcercise = () => {
  const { id } = useParams();
  const [currentExcercise, setCurrentExcercise] = useState([]);
  const [currentBodyParts, setCurrentBodyParts] = useState([]);
  const [categories, setCategories] = useState();
  const [bodyParts, setBodyParts] = useState();

  const [selectedName, setSelectedName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedPassword, setSelectedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [checked, setChecked] = useState(true);

  const navigate = useNavigate();

  const handleBodyParts = (e) => {
    setChecked(!checked);
    let curParts = currentBodyParts;
    if (curParts.includes(e.target.value)) {
      let index = curParts.indexOf(e.target.value);
      curParts.splice(index, 1);
    } else {
      curParts.push(e.target.value);
    }

    setCurrentBodyParts(curParts);
  };

  useEffect(() => {
    fetch(`/catalog/excercise/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentExcercise(data);
        // setCurrentBodyParts(data['body_part'].map((bodyPart) => bodyPart._id));
        setSelectedName(data.name);
        setSelectedDescription(data.description);
        setSelectedCategory(data.category._id);
      });

    fetch('/catalog/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));

    fetch('/catalog/body_parts')
      .then((res) => res.json())
      .then((data) => setBodyParts(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExcercise = {
      name: selectedName,
      category: selectedCategory,
      description: selectedDescription,
      body_part: currentBodyParts,
      password: selectedPassword,
    };

    fetch(`/catalog/excercise/${id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExcercise),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 'Wrong Password') {
          setErrorMessage(<p className="error">Wrong password</p>);
          return;
        } else {
          navigate(`/excercise/${id}`);
        }
      });
  };

  return (
    <div className="create-excercise-container">
      {currentExcercise.length === 0 ||
      categories === undefined ||
      // currentBodyParts.length === 0 ||
      bodyParts === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Update Excercise:</h1>
          <form className="create-form">
            <div className="value-field">
              <label htmlFor="name">Name of Excercise:</label>
              <input
                className="input-field"
                type="text"
                name="name"
                id="name"
                value={selectedName || ''}
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
                value={selectedCategory || ''}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
                required
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id} name="category">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="value-field-">
              <p className="label">Body Part(s):</p>
              <div className="body-wrapper">
                <div className="body-parts-container">
                  {bodyParts.map((bodyPart) =>
                    !currentBodyParts.includes(bodyPart._id) ? (
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
                    ) : (
                      <div className="checkbox-field" key={bodyPart._id}>
                        <label htmlFor="bodyPart">{bodyPart.name}</label>
                        <input
                          type="checkbox"
                          name="bodyPart"
                          id={bodyPart._id}
                          value={bodyPart._id}
                          onChange={handleBodyParts}
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
                value={selectedDescription || ''}
                name="description"
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
              <button onClick={handleSubmit}>Update Excercise</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateExcercise;
