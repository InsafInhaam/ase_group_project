import React from "react";
import { BeatLoader } from "react-spinners";

const TrainListingLoading = () => {
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-9">
        <div className="card shadow">
          <div className="card-body">
            <div
              className="d-flex justify-content-center align-items-center "
              style={{ height: "10vh" }}
            >
              <h3 className="text-danger p-0 m-0 d-flex align-items-center justify-content-center">
                Loading &nbsp;
                <BeatLoader color={"#36D7B7"} loading={true} size={10} />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainListingLoading;
