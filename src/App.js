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
import CategoryDetail from './components/Categorydetail';
import BodyPartDetail from './components/BodyPartDetail';
import SideBar from './components/SideBar';

function App() {
  return (
    <Router>
      <Nav />
      <div className="app">
        <SideBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/excercises" />} />
          <Route path="/excercises" element={<Excercises />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/excercise/:id" element={<ExcerciseDetail />} />
          <Route path="/workout/:id" element={<WorkoutDetail />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/body_part/:id" element={<BodyPartDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
