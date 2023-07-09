import React from 'react'
import TrainImg from '../assets/images/Railwaylogo.png'

function EditProfile() {
  return (
    <>
      <section id="EditProfile">
        <div className="container">
          {/* <h4 className="py-5 px-5">Account Settings</h4> */}
          <div className="row">
            <div className="col-lg-5">
              <div className="imgs text-center  justify-content-center mt-5">
              <img src={TrainImg} width="80%" className="img-fluid mt-5" alt="Rain Logo" />
              </div>
 
            </div>
            <div className="col-lg-7"> <br />
              {/* user edit Profile */}
            
                <div className="card p-4">
                  <div className="card-title">
                    <h5>Edit User Account</h5> <hr />
                  </div>
                  {/* fname  */}
                   <div className="mb-3">
                        <label>First Name</label>
                        <input
                         type="text"
                         className="form-control mt-1"
                         placeholder="Enter First Name"
                         />
                    </div>
                    {/* last name  */}
                    <div className="mb-3">
                        <label>Last Name</label>
                        <input
                         type="text"
                         className="form-control mt-1"
                         placeholder="Enter Last Name"
                         />
                    </div>
                    {/* email  */}
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                         type="email"
                         className="form-control mt-1"
                         placeholder="Enter email"
                         />
                    </div>
                    {/* password  */}
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                         type="password"
                         className="form-control mt-1"
                         placeholder="Enter password"
                         />
                    </div>
                    {/* Image  */}
                    <div className="mb-3">
                        <label>Upload a image</label>
                        <input
                         type="file"
                         className="form-control mt-1"
                         placeholder="Enter Last Name"
                         />
                    </div>
                    {/* password  */}
                    <div className="mb-3">
                        <label>Contact No</label>
                        <input
                         type="number"
                         className="form-control mt-2"
                         placeholder="Enter number"
                         />
                    </div>
 
                  <div className="text-right">
                    <button className="btn btn-primary px-3 mt-2 text-right">
                      Update
                    </button>
                  </div>
                </div>
            
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EditProfile
