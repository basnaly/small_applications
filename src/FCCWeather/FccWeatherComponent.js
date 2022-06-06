import React, { useState, useEffect } from "react";
import axios from "axios";

import { BsCloudLightningRain } from 'react-icons/bs';
import { Skeleton } from "@mui/material";
import './Weather.css'

const requestURL = 'https://weather-proxy.freecodecamp.rocks/';

const AppWeatherComponent = () => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const requestWeather = () => {
        setLoading(true)

        navigator.geolocation.getCurrentPosition(position => {
            let urlCurrent = requestURL +
                `api/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}`;

            axios.get(urlCurrent)
                .then(result => {
                    setData(result.data)
                    setLoading(false)
                })
        })
    }

    useEffect(() => {
        requestWeather()
    }, [])

    return (

        <div className="parent-fcc d-flex flex-column align-items-center">
            <div className="div-fcc d-flex align-items-center mt-1">
                Free C<span className="px-2">{<BsCloudLightningRain />}</span>de Camp
            </div>
            <div className="div-fcc d-flex align-items-center">
                Weather App
            </div>
            {loading ?
                <Skeleton variant="circular" width={40} height={40} />
                :
                <div className="border-fcc d-flex flex-column align-items-center p-3 mt-5">
                    <div className="data-fcc">
                        {data?.name}, {data?.sys?.country}
                    </div>
                    <div className="data-fcc">
                        {data?.main?.temp} °C
                    </div>
                    <div className="data-fcc">
                        {data?.weather?.[0]?.main}
                    </div>
                    <img className="img-fcc" src={data?.weather?.[0]?.icon} />
                </div>
            }

        </div>
    )
}

export default AppWeatherComponent;