import TrainImg from "../assets/images/Railwaylogo.png";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function EditProfile() {
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

  const user_id = user.id;
  // console.log(user_id)

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
        });
    }
  }, []);

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

  return (
    <>
      <section id="EditProfile">
        <div className="container">
          {/* <h4 className="py-5 px-5">Account Settings</h4> */}
          <div className="row">
            <div className="col-lg-5">
              <div className="imgs text-center justify-content-center mt-5">
                <img
                  src={user?.profile}
                  className="img-fluid mt-5 edit-profile-img"
                  alt="Rain Logo"
                />
                <h2 className="pt-2 text-white">{user?.name}</h2>
              </div>
            </div>
            <div className="col-lg-7">
              {" "}
              <br />
              {/* user edit Profile */}
              <div className="card p-4">
                <div className="card-title">
                  <h5>Edit User Account</h5> <hr />
                </div>
                <div>
                  {/* Form Group (username)*/}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="fullname">
                      Full name
                    </label>
                    <input
                      className="form-control"
                      id="fullname"
                      type="text"
                      placeholder="Enter your fullname"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Form Group (email address)*/}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="email">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      readOnly
                    />
                  </div>
                  {/* Form Row*/}
                  {/* Form Group ( address)*/}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="address">
                      Address
                    </label>
                    <input
                      className="form-control"
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  {/* Form Row*/}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (phone number)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="phone">
                        Phone number
                      </label>
                      <input
                        className="form-control"
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    {/* Form Group (birthday)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="birthday">
                        Birthday
                      </label>
                      <input
                        className="form-control"
                        id="birthday"
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Form Row*/}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (phone number)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="password">
                        New Password
                      </label>
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {/* Form Group (birthday)*/}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="re-password">
                        Confirm Password
                      </label>
                      <input
                        className="form-control"
                        id="re-password"
                        type="password"
                        name="re-password"
                        placeholder="Enter your confirm password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Form Group (image)*/}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="image">
                      Image
                    </label>
                    <input
                      className="form-control"
                      id="image"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                  {/* Save changes button*/}
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleSubmit()}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditProfile;
