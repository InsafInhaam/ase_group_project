import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          Railway Station
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/ticketbooking"}>
                    Book Ticket
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user && (
            <div
              className="d-flex align-items-center"
              style={{ marginLeft: "auto" }}
            >
              <h5 className="px-4 m-0">{user.name}</h5>
              <button
                type="button"
                className="btn btn-primary me-3"
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "LOGOUT" });
                  history("/login");
                }}
              >
                Logout
              </button>
              {/* edit by mir  */}
              <div className="dropdown">
        <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false"  onClick={() => {
                  history("/editprofile");
                }}>
                  {/* avatar images uploading  */}
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height={25} alt="Black and White Portrait of a Man" loading="lazy" />
        </a>
        
      </div>
              {/* end edit  */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
