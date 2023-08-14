import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const ChatMessage = () => {
  return (
    <div>
      <Sidebar />

      <section id="content">
        <Navbar />
        <main>
          <div className="head-title">
            <div className="left">
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
        
          </div>
          {/* chat */}
          <div className="px-6 chatapp-container">
            <div className="row clearfix">
              <div className="col-lg-12">
                <div className="card chat-app">
                  <div className="people-list">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                    </div>
                    <ul className="list-unstyled chat-list mt-2 mb-0">
                      <li className="clearfix">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt="avatar"
                        />
                        <div className="about">
                          <div className="name">Vincent Porter</div>
                          <div className="status">
                            {" "}
                            <i className="fa fa-circle offline"></i> left 7 mins
                            ago{" "}
                          </div>
                        </div>
                      </li>
                      {/* Rest of the list items */}
                    </ul>
                  </div>
                  <div className="chat">
                    <div className="chat-header clearfix">{/* ... */}</div>
                    <div className="chat-history">
                      <ul className="m-b-0">
                        <li className="clearfix">
                          <div className="message-data text-right">
                            <span className="message-data-time">
                              10:10 AM, Today
                            </span>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt="avatar"
                            />
                          </div>
                          <div className="message other-message float-right">
                            {" "}
                            Hi Aiden, how are you? How is the project coming
                            along?{" "}
                          </div>
                        </li>
                        <li className="clearfix">
                          <div className="message-data text-right">
                            <span className="message-data-time">
                              10:10 AM, Today
                            </span>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt="avatar"
                            />
                          </div>
                          <div className="message other-message float-right">
                            {" "}
                            Hi Aiden, how are you? How is the project coming
                            along?{" "}
                          </div>
                        </li>
                        <li className="clearfix">
                          <div className="message-data text-right">
                            <span className="message-data-time">
                              10:10 AM, Today
                            </span>
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt="avatar"
                            />
                          </div>
                          <div className="message other-message float-right">
                            {" "}
                            Hi Aiden, how are you? How is the project coming
                            along?{" "}
                          </div>
                        </li>
                        {/* ... Rest of the chat history */}
                      </ul>
                    </div>
                    <div className="chat-message clearfix">
                      <div className="input-group mb-0">{/* ... */}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </div>
  );
};

export default ChatMessage;
