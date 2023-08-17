import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { amanProfile, profileImg, trainImg } from "../assets/images";
import BookingDetails from "./BookingDetails";

function UserDashboard() {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [image, setImage] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [userProfile, setUserProfile] = useState("");

  const [displayProfileTab, setDisplayProfileTab] = useState(true);
  const [displayBookingTab, setDisplayBookingTab] = useState(false);

  const user_id = user.id;

  useEffect(() => {
    if (user_id) {
      fetch(process.env.REACT_APP_API_URL + "/passenger/getprofile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setName(result.name);
          setEmail(result.email);
          setPhone(result.phone);
          setBirthday(result.birthday);
          setAddress(result.address);
          setUserProfile(result.profile);
        });
    }
  }, [userProfile]);

  console.log(userProfile);

  const handleSubmit = () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (password) {
      if (password.length < 8) {
        return toast.error("Password must be at least 8 characters");
      } else if (!specialChars.test(password)) {
        return toast.error("Password must have special characters");
      } else if (password != rePassword) {
        return toast.error("Password and Confirm Password doesn't match");
      }
    }
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "surge-intern-test");
      data.append("cloud_name", "dp6yyczpu");
      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProfilePic(data.secure_url);
          console.log(data.secure_url);
        })
        .catch((error) => console.log(error));
    }

    let body = {
      name,
      phone,
      birthday,
      address,
    };

    if (password) {
      body.password = password;
    }

    if (profilePic) {
      body.profilePic = profilePic;
    }

    body = JSON.stringify(body);
    console.log(body);

    fetch(process.env.REACT_APP_API_URL + "/passenger/updateprofile/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayProfile = () => {
    setDisplayProfileTab(true);
    setDisplayBookingTab(false);
  };

  const displayBooking = () => {
    setDisplayProfileTab(false);
    setDisplayBookingTab(true);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Side Navigation Bar */}
          <nav className="col-md-3 mt-3 col-lg-2 d-md-block sidebar nav-sidebar ">
            <div className="position-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a
                    className="btnDesign mt-2"
                    id="tab1-tab"
                    data-bs-toggle="tab"
                    href="#tab1"
                    onClick={displayProfile}
                  >
                    <span>User</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="btnDesign mt-2"
                    id="tab3-tab"
                    data-bs-toggle="tab"
                    href="#tab2"
                    onClick={displayBooking}
                  >
                    <span>Booking Details</span>
                  </a>
                </li>

                {/* Add more tabs as needed */}
              </ul>
            </div>
          </nav>
          {/* Tab Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 tab-content">
            <div
              className="tab-pane fade show active"
              id="tab1"
              role="tabpanel"
              aria-labelledby="tab1-tab"
              style={{
                display: displayProfileTab ? "block" : "none",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <div className="card shadow">
                      <div className="card-body d-flex justify-content-center m-3">
                        <img
                          src={userProfile ? userProfile : amanProfile}
                          className="circleStyle"
                        />
                      </div>
                      <div className="container">
                        <div className="row ">
                          <div className="col-md-12 text-center mb-3">
                            <h4>My Profiles</h4>
                            <hr style={{ width: "30vh", margin: "0 auto" }} />
                          </div>
                          {/* name  */}
                          <div className="col-md-4">
                            <h6>Name</h6>
                          </div>
                          <div className="col-md-8">
                            <p>{user?.name}</p>
                          </div>
                          {/* email  */}
                          <div className="col-md-4">
                            <h6>Email</h6>
                          </div>
                          <div className="col-md-8">
                            <p>{user?.email}</p>
                          </div>
                          {/* number  */}
                          <div className="col-md-4">
                            <h6>Contact No</h6>
                          </div>
                          <div className="col-md-8">
                            <p>{user?.phone}</p>
                          </div>
                          <div className="col-md-12 mb-3">
                            {/* <div className="d-flex justify-content-center">
                              <button className="btnDesign w-100  ">
                                Success
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* colmn 8  */}
                  <div className="col-md-8 ">
                    <div className="row">
                      {/* above column  */}
                      <div className="col-md-12 mb-3">
                        <div className="container">
                          <div className="card shadow">
                            <div className="card-header">
                              <h6>Edit Profiles</h6>
                            </div>
                            <div className="card-body">
                              <form>
                                <div className="row">
                                  {/* 1st row  */}
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="exampleInputEmail1">
                                        Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  {/* 1st row 2nd clm  */}
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="exampleInputEmail1">
                                        Email
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={email}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  {/* 2nd row 1st clm  */}
                                  <div className="col-md-6">
                                    <div className="form-group mt-2 mb-2">
                                      <label>Password</label>
                                      <input
                                        type="Password"
                                        className="form-control"
                                        placeholder="password"
                                        value={password}
                                        onChange={(e) =>
                                          setPassword(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group mt-2 mb-2">
                                      <label>Confirm Password</label>
                                      <input
                                        type="Password"
                                        className="form-control"
                                        placeholder="Confirm password"
                                        value={rePassword}
                                        onChange={(e) =>
                                          setRePassword(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group mt-2 mb-2">
                                      <label>Address </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="address"
                                        value={address}
                                        onChange={(e) =>
                                          setAddress(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group mt-2 mb-2">
                                      <label>Phone no </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="phone"
                                        value={phone}
                                        onChange={(e) =>
                                          setPhone(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group mt-2 mb-2">
                                      <label>DOB </label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        placeholder="phone"
                                        value={birthday}
                                        onChange={(e) =>
                                          setBirthday(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group mt-2 mb-2">
                                      <label>Profile </label>
                                      <input
                                        type="file"
                                        className="form-control"
                                        placeholder="phone"
                                        onChange={(e) =>
                                          setImage(e.target.files[0])
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="btnDesign"
                                  onClick={() => handleSubmit()}
                                >
                                  Update
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="container">
                          <div className="card shadow">
                            <div className="card-header">
                              <h4>Active Links</h4>
                            </div>
                            <div className="card-body">
                              <a href="#">
                                <h6>Booking the Train ticket</h6>
                              </a>
                              <a href="#">
                                <h6>Home</h6>
                              </a>
                              <a href="#">
                                <h6>About</h6>
                              </a>
                              <a href="#">
                                <h6>Logout</h6>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* bottom clm  */}
                    </div>
                  </div>
                </div>
                {/* row end  */}
              </div>
            </div>
            {/* tab 3  */}
            <div
              className="tab-pane fade"
              id="tab2"
              role="tabpanel"
              aria-labelledby="tab3-tab"
              style={{
                display: displayBookingTab ? "block" : "none",
              }}
            >
              <BookingDetails
                userProfile={userProfile}
                defaultProfile={amanProfile}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
