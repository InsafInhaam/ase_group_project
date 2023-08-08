import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import SearchTrainBlock from "../components/SearchTrainBlock";

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
        <Navbar />
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
                {/* train form */}
                <SearchTrainBlock />
                {/* end train from */}
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
                          <label htmlFor="name" className>
                            Your name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                          />
                        </div>
                      </div>
                      {/*Grid column*/}
                      {/*Grid column*/}
                      <div className="col-md-6">
                        <div className="md-form mb-0">
                          <label htmlFor="email" className>
                            Your email
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control"
                          />
                        </div>
                      </div>
                      {/*Grid column*/}
                    </div>
                    {/*Grid row*/}
                    {/*Grid row*/}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="md-form mb-0">
                          <label htmlFor="subject" className>
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    {/*Grid row*/}
                    {/*Grid row*/}
                    <div className="row">
                      {/*Grid column*/}
                      <div className="col-md-12">
                        <div className="md-form">
                          <label htmlFor="message">Your message</label>
                          <textarea
                            type="text"
                            id="message"
                            name="message"
                            rows={3}
                            className="form-control md-textarea"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                    {/*Grid row*/}
                  </form>
                  <div className="text-center text-md-left mt-4">
                    <a className="btnDesign">Feel free to contact</a>
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
                    <h3 className="text-warning">COLOMBO EXPRESS</h3>
                    <span>
                      123 Second Street Fifth <br />
                      Avenue,
                      <br />
                      Colombo 10
                      <br />
                      +94 777123456
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
                    <h3> Subscribe</h3>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <textarea
                          className="textarea"
                          placeholder="comment"
                          type="text"
                          defaultValue={"Comment"}
                        />
                      </div>
                    </div>
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
