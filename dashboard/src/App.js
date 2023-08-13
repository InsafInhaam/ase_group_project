import "./App.css";
import Login from "./screens/Login";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Popup from "./components/Popup";
import AddAdmin from "./screens/AddAdmin";
import Bookings from "./screens/Bookings";
import Home from "./screens/Home";
import Train from "./screens/Train";
import ViewTrains from "./screens/ViewTrains";
import { TestS } from "./screens/TestS";
import Admin from "./screens/Admin";
import Passenger from "./screens/Passenger";

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

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        exact
        path="/bookings"
        element={user ? <Bookings /> : <Navigate to="/login" />}
      />
      <Route exact path="/trains" element={<Train />} />

      <Route exact path="/viewtrains" element={<ViewTrains />} />

      <Route exact path="/add-admin" element={<Admin />} />
      <Route exact path="/passenger" element={<Passenger />} />

      <Route exact path="/login" element={<Login />} />
      <Route exact path="/tests" element={<TestS />} />
    </Routes>
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
