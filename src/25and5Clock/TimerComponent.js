import React, { useRef, useEffect, useState } from "react";

import { Button } from "@mui/material";
import { FiPlay, FiPause, FiRepeat } from 'react-icons/fi';
import './Clock.css';

const src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav';

const TimerComponent = ({ breakLength, setBreakLength,
    sessionLength, setSessionLength,
    isTimerRunning, setIsTimerRunning }) => {

    const timerRef = useRef();

    const audioRef = useRef();

    const [timer, setTimer] = useState(sessionLength * 60);
    const [timerToggle, setTimerToggle] = useState('Session');

    useEffect(() => {

        if (timerToggle === 'Session') {
            setTimer(sessionLength * 60)
        }

    }, [sessionLength])

    useEffect(() => {

        if (timerToggle === 'Break') {
            setTimer(breakLength * 60)
        }

    }, [breakLength])


    const toggleTimer = () => {

        setIsTimerRunning(!isTimerRunning);
    }

    useEffect(()=> {
        if (timer === 0) {

            audioRef.current = new Audio(src);
            audioRef.current.play();

            if (timerToggle === 'Break') {
                setTimerToggle('Session');
                setTimer(sessionLength * 60)
            } else {
                setTimerToggle('Break');
                setTimer(breakLength * 60);
            }
        }

    }, [timer])

    useEffect(() => {

        if (timerRef.current) {
            clearInterval(timerRef.current)
        }

        if (isTimerRunning) {
            timerRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev === 0) {
                        return 0    
                    } else {
                        return prev - 1;
                    }
                })
            }, 1000)
        }
    }, [isTimerRunning]);

    const reset = () => {

        setSessionLength(25);
        setBreakLength(5);
        setIsTimerRunning(false);
        setTimer(25 * 60);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }

    let minutes = Math.floor(timer / 60);

    let seconds = Math.floor(timer - minutes * 60);

    minutes = minutes > 9 ? minutes : '0' + minutes;
    seconds = seconds > 9 ? seconds : '0' + seconds;

    return (
        <React.Fragment>
            <div className="session-clock d-flex flex-column align-items-center"
                style={minutes === '00' ? { color: 'magenta' } : {}}>
                <div id="timer-label">{timerToggle}</div>
                <div id="time-left" >
                    {minutes} : {seconds}
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div >
                    <Button id="start_stop" onClick={toggleTimer}>
                        <FiPlay color="cadetblue" className="audio-clock" />
                        <FiPause color="cadetblue" className="audio-clock" />
                    </Button>

                    <Button id="reset" onClick={reset}>
                        <FiRepeat color="cadetblue" className="audio-clock"/>
                    </Button>
                    <audio id='beep'></audio>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TimerComponent;