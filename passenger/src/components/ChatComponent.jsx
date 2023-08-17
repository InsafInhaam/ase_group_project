import React, { useState } from "react";

const ChatComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, isUser: true }]);
      setNewMessage("");
    }
  };

  return (
    <>
      <section
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          display: "none"
        }}>
        <button onClick={toggleChat} className="chatbot-close-icon">
          {/* Close Chat */}

          {!isChatOpen ? (
            <i className="fa fa-commenting" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-window-close" aria-hidden="true"></i>
          )}
        </button>
        {isChatOpen && (
          <div
            className="container"
            style={{
              backgroundColor: "#eee",
              width: "500px",
              borderRadius: "15px",
            }}>
            <div className="row p-3">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div
                    className="p-3 ms-3"
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "rgba(57, 192, 237,.2)",
                    }}>
                    <p className="small mb-0">
                      Hello and thank you for visiting MDBootstrap. Please click
                      the video below.
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-end mb-4">
                  <div
                    className="p-3 me-3 border"
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#fbfbfb",
                    }}>
                    <p className="small mb-0">
                      Thank you, I really like your product.
                    </p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>
                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div className="ms-3" style={{ borderRadius: "15px" }}>
                    <div className="bg-image">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp"
                        style={{ borderRadius: "15px" }}
                        alt="video"
                      />
                      <a href="#!">
                        <div className="mask" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div
                    className="p-3 ms-3"
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "rgba(57, 192, 237,.2)",
                    }}>
                    <p className="small mb-0">...</p>
                  </div>
                </div>
              </div>
              <div className="form-outline" style={{ marginTop: "20px" }}>
                <textarea
                  className="form-control"
                  rows="4"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}></textarea>
                <label className="form-label" htmlFor="textAreaExample">
                  Type your message
                </label>
                <button
                  type="button"
                  className="btnDesign"
                  onClick={handleSendMessage}>
                  Send
                </button>
              </div>
            </div>
            {/* Chat content */}
            {/* <div className="row d-flex justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-4"> */}
            {/* <div
                  className="card"
                  id="chat1"
                  style={{ borderRadius: "15px" }}
                > */}
            {/* <div
                    className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  >
                    <i className="fas fa-angle-left" />
                    <p className="mb-0 fw-bold">Live chat</p>
                    <i className="fas fa-times" />
                  </div> */}

            {/* </div> */}
            {/* </div>
            </div> */}
          </div>
        )}
      </section>
    </>
  );
};

export default ChatComponent;
