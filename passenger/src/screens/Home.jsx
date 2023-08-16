import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import SearchTrainBlock from "../components/SearchTrainBlock";
import {
  galery1,
  galery2,
  galery3,
  galery4,
  galery5,
  galery6,
} from "../assets/images";
import ChatComponent from "../components/ChatComponent";

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
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

        {/* gelary section  */}
        <div id="Gallery" className="mt-4 mb-5 py-5 bg-light">
          <div className="container ">
            <div className="row">
              <div className="col-md-12 ">
                <div className="titlepage">
                  <h2>Galery View</h2>
                  <span>
                    Welcome to our gallery page, a visual journey through
                    captivating moments and exquisite artistry.
                  </span>
                </div>
              </div>
              <div className="col-md-4 mb-3 ">
                <div className="galery-box ">
                  <img
                    src={galery1}
                    alt="galerImg"
                    className="img-fluid shadow"
                  />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center mb-3 ">
                <div className="galery-box">
                  <img
                    src={galery2}
                    alt="galerImg"
                    className="img-fluid shadow"
                  />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center mb-3">
                <div className="galery-box d-flex ">
                  <img
                    src={galery4}
                    alt="galerImg"
                    className="img-fluid shadow"
                  />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center mb-3 ">
                <div className="galery-box">
                  <img
                    src={galery3}
                    alt="galerImg"
                    className="img-fluid shadow"
                  />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center mb-3 ">
                <div className="galery-box">
                  <img
                    src={galery5}
                    alt="galerImg"
                    className="img-fluid shadow"
                  />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center mb-3 ">
                <div className="galery-box">
                  <img
                    src={galery6}
                    alt="galerImg"
                    className="img-fluid shadow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end galery secrion  */}

        {/* Customer review section  */}
        <div id="CustomerReview" className="mt-4 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 ">
                <div className="titlepage">
                  <h2>Customer reviews</h2>
                  <span>
                    what are say the customer abour our systems , their
                    travelling , and their feedbacks
                  </span>
                </div>
              </div>
              {/* card feedback one  */}
              <div className="col-md-3 mb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <img
                        src={galery1}
                        alt=""
                        className="img-fluid shadow circleStyles"
                      />
                    </div>
                  </div>
                  <div className="card-header">
                    <div className="text-center">
                      <div className="text-warning ">
                        <span>
                          <i className="fas fa-star fa-2xs"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="far fa-star"></i>
                        </span>
                      </div>
                      <hr className="custom-hr mb-3" />
                    </div>
                    <div className="h6 text-center">
                      Amaan
                      <p className="mt-2">
                        "Travelling with your company was an unforgettable
                        adventure filled with new horizons "
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* card feedback 2 */}
              <div className="col-md-3 mb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <img
                        src={galery2}
                        alt=""
                        className="img-fluid shadow circleStyles"
                      />
                    </div>
                  </div>
                  <div className="card-header">
                    <div className="text-center">
                      <div className="text-warning ">
                        <span>
                          <i className="fas fa-star fa-2xs"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="far fa-star"></i>
                        </span>
                      </div>
                      <hr className="custom-hr mb-3" />
                    </div>
                    <div className="h6 text-center">
                      Inshaf Inhaam
                      <p className="mt-2">
                        "Our journey was made seamless and remarkable, thanks to
                        your exceptional travel services."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* card feedback 3  */}
              <div className="col-md-3 mb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <img
                        src={galery3}
                        alt=""
                        className="img-fluid shadow circleStyles"
                      />
                    </div>
                  </div>
                  <div className="card-header">
                    <div className="text-center">
                      <div className="text-warning ">
                        <span>
                          <i className="fas fa-star fa-2xs"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="far fa-star"></i>
                        </span>
                      </div>
                      <hr className="custom-hr mb-3" />
                    </div>
                    <div className="h6 text-center">
                      Haneem
                      <p className="mt-2">
                        "Exploring new cultures and landscapes through your
                        travel package was a dream come true"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* card feedback 4  */}
              <div className="col-md-3 mb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <img
                        src={galery5}
                        alt=""
                        className="img-fluid shadow circleStyles"
                      />
                    </div>
                  </div>
                  <div className="card-header">
                    <div className="text-center">
                      <div className="text-warning ">
                        <span>
                          <i className="fas fa-star fa-2xs"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="fas fa-star"></i>
                        </span>
                        <span>
                          <i className="far fa-star"></i>
                        </span>
                      </div>
                      <hr className="custom-hr mb-3" />
                    </div>
                    <div className="h6 text-center">
                      Mirshath
                      <p className="mt-2">
                        "Our vacation was a perfect blend of relaxation and
                        exploration, all thanks to your meticulous
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end Customer review secrion  */}

        {/* contact us  */}
        <section id="Contact" className="bg-light py-5">
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
                    method="POST"
                  >
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
                    <button className="btnDesign" style={{ color: "white" }}>
                      Feel free to contact
                    </button>
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
                      <a href="#">
                        <img src="icon/facebook.png" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="icon/Twitter.png" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="icon/linkedin.png" />
                      </a>
                    </li>
                    <li>
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
                        <a href="#">About us</a>
                      </li>
                      <li>
                        <a href="#">Terms and conditions</a>
                      </li>
                      <li>
                        <a href="#"> Privacy policy</a>
                      </li>
                      <li>
                        <a href="#">News</a>
                      </li>
                      <li>
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
                        <input
                          className="form-control"
                          placeholder="email"
                          type="text"
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
      <ChatComponent />
    </>
  );
};

export default Home;
