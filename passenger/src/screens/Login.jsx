import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    fetch(process.env.REACT_APP_API_URL + "/passenger/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "LOGIN", payload: data.user });
          toast.success(data.message);
          history("/");
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
                      <h3>Sign In</h3>
                    </div>
                    <div className="card-body">
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
                          className="btnDesign shadow"
                          onClick={() => handleSubmit()}>
                          Login
                        </button>
                      </div>

                      <p className="forgot-password text-right mt-3">
                        Don't have an account <a href="/register">Register?</a>
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

export default Login;