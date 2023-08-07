import "./App.css";
import Login from "./screens/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Register from "./screens/Register";
import BookingTicket from "./screens/BookingTicket";
import Popup from "./components/Popup";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import EditProfile from "./screens/EditProfile";
import Map from "./screens/Map";
import SearchTrain from "./screens/SearchTrain";
import TrainListing from "./screens/TrainListing";
import BookingTrain from "./screens/BookingTrain ";

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
        path="/ticketbooking"
        element={user ? <BookingTicket /> : <Navigate to="/login" />}
      />
      <Route
        exact
        path="/editprofile"
        element={user ? <EditProfile /> : <Navigate to="/login" />}
      />
      <Route
        exact
        path="/map"
        element={user ? <Map /> : <Navigate to="/login" />}
      />
      <Route
        exact
        path="/searchtrain"
        element={user ? <SearchTrain /> : <Navigate to="/login" />}
      />

      <Route
        exact
        path="/trainlistings"
        element={user ? <TrainListing /> : <Navigate to="/login" />}
      />

      <Route
        exact
        path="/bookingtrain/:id"
        element={user ? <BookingTrain /> : <Navigate to="/login" />}
      />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      <Router>
        {/* <div className="App"> */}
        <Popup />
        {/* <Navbar /> */}
        {/* <div className="auth-wrapper"> */}
        {/* <Router> */}
        <Routing />
        {/* </Router> */}
        {/* </div>
        </div> */}
      </Router>
    </>
  );
}

export default App;
