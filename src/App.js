import Excercises from './components/Excercises';
import Nav from './components/Nav';
import Workouts from './components/Workouts';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import ExcerciseDetail from './components/ExcerciseDetail';
import WorkoutDetail from './components/WorkoutDetail';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate replace to="/excercises" />} />
        <Route path="/excercises" element={<Excercises />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/excercise/:id" element={<ExcerciseDetail />} />
        <Route path="/workout/:id" element={<WorkoutDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
