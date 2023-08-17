import "./App.css";
import Login from "./screens/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Register from "./screens/Register";
import Popup from "./components/Popup";
import Home from "./screens/Home";
import SearchTrain from "./screens/SearchTrain";
import TrainListing from "./screens/TrainListing";
import BookingTrain from "./screens/BookingTrain ";
import SummaryPage from "./screens/SummaryPage";
import UserDashboard from "./screens/UserDashboard";
import MapTracking from "./screens/MapTracking";
import MobNav from "./components/MobNav";

// Define the initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const Routing = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const isLoginOrRegisterPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Routes>
        <Route
          exact
          path="/userdashboard"
          element={user ? <UserDashboard /> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/searchtrain"
          element={user ? <SearchTrain /> : <Navigate to="/login" />}
        />

        <Route exact path="/trainlistings" element={<TrainListing />} />

        <Route
          exact
          path="/bookingtrain/:id"
          element={user ? <BookingTrain /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/bookingtrain/:id"
          element={user ? <BookingTrain /> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/summary"
          element={user ? <SummaryPage /> : <Navigate to="/login" />}
        />

        <Route
          exact
          path="/maptracking/:trainid"
          element={user ? <MapTracking /> : <Navigate to="/login" />}
        />

        <Route exact path="/" element={<Home />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
      {!isLoginOrRegisterPage && <MobNav />}
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <Popup />
        <Routing />
      </Router>
    </>
  );
}

export default App;
