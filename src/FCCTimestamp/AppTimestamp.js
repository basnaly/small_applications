import React from "react";

import './Timestamp.css';
import TimestampComponent from "./TimestampComponent";

const AppTimestamp = () => {


    return (
        <div className="d-flex flex-column align-items-center">
            <h2 className="d-flex m-4">
                Timestamp Microservice
            </h2>
            <hr className="hr-tsp"></hr>
            <TimestampComponent />
        </div>
    )
}

export default AppTimestamp;