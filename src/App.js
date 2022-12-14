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
import CreateExcercise from './components/CreateExcercise';
import CreateWorkout from './components/CreateWorkout';
import UpdateExcercise from './components/UpdateExcercise';
import UpdateWorkout from './components/UpdateWorkout';

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
          <Route path="/excercise/create" element={<CreateExcercise />} />
          <Route path="/workout/create" element={<CreateWorkout />} />
          <Route path="/excercise/:id/update" element={<UpdateExcercise />} />
          <Route path='/workout/:id/update' element={<UpdateWorkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
