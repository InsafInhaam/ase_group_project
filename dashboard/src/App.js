import "./App.css";
import Login from "./screens/Login";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Popup from "./components/Popup";
import Bookings from "./screens/Bookings";
import Home from "./screens/Home";
import Train from "./screens/Train";
import ViewTrains from "./screens/ViewTrains";
import Admin from "./screens/Admin";
import Passenger from "./screens/Passenger";
import Expenses from "./screens/Expenses";

// Define the initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  activeItem: "Dashboard",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "SET_ACTIVE_ITEM":
      return {
        ...state,
        activeItem: action.payload,
      };
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
      <Route
        exact
        path="/trains"
        element={user ? <Train /> : <Navigate to="/login" />}
      />

      <Route
        exact
        path="/viewtrains"
        element={user ? <ViewTrains /> : <Navigate to="/login" />}
      />

      <Route
        exact
        path="/expenses"
        element={user ? <Expenses /> : <Navigate to="/login" />}
      />
      <Route
        exact
        path="/add-admin"
        element={user ? <Admin /> : <Navigate to="/login" />}
      />
      <Route
        exact
        path="/passenger"
        element={user ? <Passenger /> : <Navigate to="/login" />}
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
