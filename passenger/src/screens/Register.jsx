import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Register = () => {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!name || !email || !password) {
      return toast.error("Please fill all required fields");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return toast.error("Invalid email address");
    } else if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    } else if (!specialChars.test(password)) {
      return toast.error("Password must have special characters");
    }

    fetch(process.env.REACT_APP_API_URL + "/passenger/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          history("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="loginBackground">
        <div className="container ">
          <div className="row LoginHeight justify-content-center align-items-center">
            <div className="col-md-6 ">
              <div className="auth-inner shadow">
                <form>
                  <div className="card shadow">
                    <div className="card-header">
                      <h3>Sign Up</h3>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label>Full name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter ur fullname"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="d-grid">
                        <button
                          type="button"
                          className="btnDesign"
                          onClick={() => handleSubmit()}>
                          Sign Up
                        </button>
                      </div>

                      <p className="forgot-password text-right mt-3">
                        Already registered <a href="/login">sign in?</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
