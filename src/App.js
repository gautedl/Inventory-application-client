import Excercises from './components/Excercises';
import Nav from './components/Nav';
import Workouts from './components/Workouts';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate replace to="/excercises" />} />
        <Route path="/excercises" element={<Excercises />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </Router>
  );
}

export default App;
