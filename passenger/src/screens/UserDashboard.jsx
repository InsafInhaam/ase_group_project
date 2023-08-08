import React from "react";

function UserDashboard() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Side Navigation Bar */}
          <nav className="col-md-3 mt-5 col-lg-2 d-md-block  sidebar nav-sidebar">
            <div className="position-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="tab1-tab"
                    data-bs-toggle="tab"
                    href="#tab1">
                    <button className="btn btn-primary w-100">User</button>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="tab3-tab"
                    data-bs-toggle="tab"
                    href="#tab2">
                    <button className="btn btn-primary w-100">
                      Booking Details
                    </button>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="tab3-tab"
                    data-bs-toggle="tab"
                    href="#tab2">
                    <button className="btn btn-warning w-100">HOME</button>
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
              aria-labelledby="tab1-tab">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <div className="card shadow">
                      <div className="card-body d-flex justify-content-center m-3">
                        <img
                          src="man.png"
                          className="img-fluid shadow"
                          width="80%"
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
                            <p>Mirshath</p>
                          </div>
                          {/* email  */}
                          <div className="col-md-4">
                            <h6>Email</h6>
                          </div>
                          <div className="col-md-8">
                            <p>mirshath@gmail.com</p>
                          </div>
                          {/* number  */}
                          <div className="col-md-4">
                            <h6>Contact No</h6>
                          </div>
                          <div className="col-md-8">
                            <p>+94 777123456</p>
                          </div>
                          <div className="col-md-12 mb-3  ">
                            <div className="d-flex justify-content-center">
                              <button className="btn btn-primary w-100  ">
                                Success
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* colmn 8  */}
                  <div className="col-md-8 ">
                    <div className="row">
                      {/* above column  */}
                      <div className="col-md-8 mb-3">
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
                                        defaultValue="Mirshath"
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
                                        defaultValue="Email"
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
                                        defaultValue
                                      />
                                    </div>
                                  </div>
                                  {/* 2nd 2nd row  */}
                                  <div className="col-md-6">
                                    <div className="form-group mt-2 mb-2">
                                      <label>Address </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="address"
                                        defaultValue="Address"
                                      />
                                    </div>
                                  </div>
                                  {/* 3rd row 1 clm  */}
                                  <div className="col-md-6">
                                    <div className="form-group mt-2 mb-2">
                                      <label>Phone no </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="phone"
                                        defaultValue="+94 777123456"
                                      />
                                    </div>
                                  </div>
                                  {/* 3rd row row 2nd clm  */}
                                  <div className="col-md-6">
                                    <div className="form-group mt-2 mb-2">
                                      <label>DOB </label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        placeholder="phone"
                                        defaultValue
                                      />
                                    </div>
                                  </div>
                                  {/* 4th row  */}
                                  <div className="col-md-12">
                                    <div className="form-group mt-2 mb-2">
                                      <label>Profile </label>
                                      <input
                                        type="file"
                                        className="form-control"
                                        placeholder="phone"
                                        defaultValue
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-primary">
                                  Update
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="container">
                          <div className="card shadow">
                            <div className="card-header">
                              <h4>Active Links</h4>
                            </div>
                            <div className="card-body">
                              <a href>
                                <h6>Booking the Train ticket</h6>
                              </a>
                              <a href>
                                <h6>Home</h6>
                              </a>
                              <a href>
                                <h6>About</h6>
                              </a>
                              <a href>
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
              aria-labelledby="tab3-tab">
              <div className="container">
                {/* <div class="card bg-light shadow" style="height: 90vh;"> */}
                <div className="row">
                  {/* 1st card  */}
                  <div className="col-md-4 mb-3">
                    <div className="container">
                      <div className="card shadow">
                        <div className="card-body">
                          <div className="imge d-flex justify-content-center">
                            <img
                              src="man.png"
                              width="50%"
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                          <hr />
                          <div className="card-body">
                            <div className="row d-flex">
                              {/* name  */}
                              <div className="col-md-4">
                                <h6>Name</h6>
                              </div>
                              <div className="col-md-8">
                                <p>Mirshath</p>
                              </div>
                              {/* email  */}
                              <div className="col-md-4">
                                <h6>Email</h6>
                              </div>
                              <div className="col-md-8">
                                <p>mirshath@gmail.com</p>
                              </div>
                              {/* phone number  */}
                              <div className="col-md-4">
                                <h6>Call</h6>
                              </div>
                              <div className="col-md-8">
                                <p>+94 777123456</p>
                              </div>
                              {/* seat no  */}
                              <div className="col-md-4">
                                <h6>Seat No</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                              {/* booking date  */}
                              <div className="col-md-4">
                                <h6>BookingDate</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                              {/* booking time  */}
                              <div className="col-md-4">
                                <h6>BookingTime</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                              {/* order id  */}
                              <div className="col-md-4">
                                <h6>OrderId</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                              {/* price  */}
                              <div className="col-md-4">
                                <h6>Price</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  {/* 2nd card  */}
                  <div className="col-md-4 mb-3">
                    <div className="container">
                      <div className="card shadow">
                        <div className="card-body">
                          <div className="imge d-flex justify-content-center">
                            <img
                              src="man.png"
                              width="50%"
                              className="img-fluid"
                              alt="img"
                            />
                          </div>
                          <hr />
                          <div className="card-body">
                            <div className="row d-flex">
                              {/* name  */}
                              <div className="col-md-4">
                                <h6>Name</h6>
                              </div>
                              <div className="col-md-8">
                                <p>Mirshath</p>
                              </div>
                              {/* email  */}
                              <div className="col-md-4">
                                <h6>Email</h6>
                              </div>
                              <div className="col-md-8">
                                <p>mirshath@gmail.com</p>
                              </div>
                              {/* phone number  */}
                              <div className="col-md-4">
                                <h6>Call</h6>
                              </div>
                              <div className="col-md-8">
                                <p>+94 777123456</p>
                              </div>
                              {/* seat no  */}
                              <div className="col-md-4">
                                <h6>Seat No</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                              {/* booking date  */}
                              <div className="col-md-4">
                                <h6>BookingDate</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                              {/* booking time  */}
                              <div className="col-md-4">
                                <h6>BookingTime</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                              {/* order id  */}
                              <div className="col-md-4">
                                <h6>OrderId</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                              {/* price  */}
                              <div className="col-md-4">
                                <h6>Price</h6>
                              </div>
                              <div className="col-md-8">
                                <p>----</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  {/* 3rd card */}
                </div>
              </div>
            </div>
            {/* Add more tab content sections as needed */}
          </main>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
