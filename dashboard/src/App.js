import "./App.css";
import Login from "./screens/Login";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Popup from "./components/Popup";
import Home from "./screens/Home";
import Bookings from "./screens/Bookings";

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
      <Route exact path="/login" element={<Login />} />
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
