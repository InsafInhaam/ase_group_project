import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/booking/bookingsById/" + user.id)
      .then((res) => res.json())
      .then((result) => {
        setBookings(result);
      });
  }, []);

  console.log(bookings);

  return (
    <>
      <div>
        {/* loader  */}
        {/* <div className="loader_bg">
          <div className="loader"><img src="images/loading.gif" alt="#" /></div>
        </div> */}
        {/* end loader */}
        {/* header */}
        <header>
          {/* header inner */}

          <div className="header">
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-4">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  COLOMBO EXPRESS
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Login
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Signup
                      </a>
                    </li>
                  </ul>
                  {/* ----------------------  */}

                  {/* Example split danger button */}
                  <div className="btn-group mr-4">
                    <button type="button" className="btn btn-primary">
                      Name
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* ------------------------  */}
                </div>
              </div>
            </nav>
          </div>
          {/* end header inner */}
        </header>
        {/* end header */}
        <section>
          <div className="banner-main">
            <img src="images/bann.png" className="bannerImg" alt="#" />
            <div className="container">
              <div className="text-bg">
                <h1>
                  WELCOME TO
                  <br />
                  <strong className="white">COLOMBO EXPRESS</strong>
                </h1>
                <div className="button_section">
                  {" "}
                  <a className="main_bt" href="#">
                    Read More
                  </a>
                </div>
                <div className="container">
                  <form className="main-form shadow">
                    <h3 className="shadow">Find Your Tour</h3>
                    <div className="row">
                      {/* 1st section  */}
                      <div className="col-sm-3">
                        <label>From Station</label>
                        <select className="form-control" name="Any">
                          <option>Any</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                      {/* 2nd section  */}
                      <div className="col-sm-3">
                        <label>From Station</label>
                        <select className="form-control" name="Any">
                          <option>Any</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                      {/* 3rd section  */}
                      <div className="col-sm-3">
                        <label>Date</label>
                        <input
                          className="form-control"
                          placeholder="Any"
                          type="date"
                          name="Any"
                        />
                      </div>
                      {/* 4th section  */}
                      <div className="col-sm-3 d-flex align-items-center justify-content-center mt-3 ">
                        <a href="#">search</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* about */}
        <div id="about" className="about mt-4">
          <div className="container ">
            <div className="row">
              <div className="col-md-12 ">
                <div className="titlepage">
                  <h2>About our Train Ticket Booking</h2>
                  <span>
                    Overall, train travel is a great option for people who are
                    looking for a reliable, affordable, and environmentally
                    friendly way to travel.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="about-box ">
                    <p className="shadow">
                      {" "}
                      <span>
                        Train travel is an important mode of transportation for
                        many people around the world. It is a reliable,
                        affordable, and environmentally friendly way to travel.
                        Trains can carry large numbers of people, making them a
                        good option for commuting and long-distance travel. They
                        are also less polluting than cars or planes, making them
                        a more sustainable option. Train travel offers a number
                        of advantages over other modes of transportation. Trains
                        are typically more comfortable than buses or cars, and
                        they offer more legroom and space to move around. They
                        are also more reliable than planes, and they are less
                        likely to be delayed or cancelled.
                      </span>
                    </p>
                    <div className="palne-img-area">
                      <img
                        src="../images/train.png"
                        alt="images"
                        className="img_train"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href="#">Read More</a>
          </div>
        </div>
        {/* end about */}

        {/* contact us  */}
        <section>
          <div className="container">
            <div className="row ">
              <div className="col-md-12">
                <div className="titlepage">
                  <h2>Contact Us</h2>
                  <span>
                    We are always looking for new opportunities to help you with
                    your travel needs.
                  </span>
                </div>
              </div>
            </div>
            {/* another row  */}

            {/*Section: Contact v.2*/}
            <section className="mb-4">
              {/*Section heading*/}

              <div className="row justify-content-center">
                {/*Grid column*/}
                <div className="col-md-9 mb-md-0 mb-5">
                  <form
                    id="contact-form"
                    name="contact-form"
                    action="mail.php"
                    method="POST">
                    {/*Grid row*/}
                    <div className="row">
                      {/*Grid column*/}
                      <div className="col-md-6">
                        <div className="md-form mb-0">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                          />
                          <label htmlFor="name" className>
                            Your name
                          </label>
                        </div>
                      </div>
                      {/*Grid column*/}
                      {/*Grid column*/}
                      <div className="col-md-6">
                        <div className="md-form mb-0">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control"
                          />
                          <label htmlFor="email" className>
                            Your email
                          </label>
                        </div>
                      </div>
                      {/*Grid column*/}
                    </div>
                    {/*Grid row*/}
                    {/*Grid row*/}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="md-form mb-0">
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="form-control"
                          />
                          <label htmlFor="subject" className>
                            Subject
                          </label>
                        </div>
                      </div>
                    </div>
                    {/*Grid row*/}
                    {/*Grid row*/}
                    <div className="row">
                      {/*Grid column*/}
                      <div className="col-md-12">
                        <div className="md-form">
                          <textarea
                            type="text"
                            id="message"
                            name="message"
                            rows={3}
                            className="form-control md-textarea"
                            defaultValue={""}
                          />
                          <label htmlFor="message">Your message</label>
                        </div>
                      </div>
                    </div>
                    {/*Grid row*/}
                  </form>
                  <div className="text-center text-md-left">
                    <a className="btn btn-primary">Send</a>
                  </div>
                  <div className="status" />
                </div>
                {/*Grid column*/}
              </div>
            </section>
            {/*Section: Contact v.2*/}
          </div>
        </section>
        {/* !contact us  */}

        {/* footer */}
        <footer className="">
          <div id="contact" className="footer">
            <div className="container">
              <div className="row pdn-top-30">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <ul className="location_icon">
                    <li>
                      {" "}
                      <a href="#">
                        <img src="icon/facebook.png" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#">
                        <img src="icon/Twitter.png" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#">
                        <img src="icon/linkedin.png" />
                      </a>
                    </li>
                    <li>
                      {" "}
                      <a href="#">
                        <img src="icon/instagram.png" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                  <div className="Follow">
                    <h3>CONTACT US</h3>
                    <span>
                      123 Second Street Fifth <br />
                      Avenue,
                      <br />
                      Colombo 10
                      <br />
                      +94 765432100
                    </span>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                  <div className="Follow">
                    <h3>ADDITIONAL LINKS</h3>
                    <ul className="link">
                      <li>
                        {" "}
                        <a href="#">About us</a>
                      </li>
                      <li>
                        {" "}
                        <a href="#">Terms and conditions</a>
                      </li>
                      <li>
                        {" "}
                        <a href="#"> Privacy policy</a>
                      </li>
                      <li>
                        {" "}
                        <a href="#">News</a>
                      </li>
                      <li>
                        {" "}
                        <a href="#"> Contact us</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="Follow">
                    <h3> Contact</h3>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <input
                          className="Newsletter"
                          placeholder="Name"
                          type="text"
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <input
                          className="Newsletter"
                          placeholder="Email"
                          type="text"
                        />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <textarea
                          className="textarea"
                          placeholder="comment"
                          type="text"
                          defaultValue={"Comment"}
                        />
                      </div>
                    </div>
                    <button className="Subscribe">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* end footer */}
      </div>
    </>
  );
};

export default Home;
