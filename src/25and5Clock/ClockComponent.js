import { Button } from "@mui/material";
import React, {useState} from "react";

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import './Clock.css';
import TimerComponent from "./TimerComponent";

const ClockComponent = () => {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const incrementBreak = () => {

        if (isTimerRunning) {
            return
        }

        if (breakLength < 60) {
            setBreakLength(prev => prev + 1);
        }
    }

    const incrementSession = () => {

        if (isTimerRunning) {
            return
        }

        if (sessionLength < 60) {
            setSessionLength(prev => prev + 1);
        }
    }

    const decrementBreak = () => {

        if (isTimerRunning) {
            return
        }

        if (breakLength > 1) {
            setBreakLength(prev => prev - 1);
        }
    }

    const decrementSession = () => {

        if (isTimerRunning) {
            return
        }

        if (sessionLength > 1) {
            setSessionLength(prev => prev - 1);
        }
    }
    
    return (
        <div className="parent-clock d-flex flex-column align-items-center ">
            <div className="title-clock d-flex flex-column align-items-center">
                25 + 5 Clock
            </div>
            <div className="types-clock d-flex align-items-center justify-content-between">
                <div className="d-flex flex-column align-items-center mx-4">
                    <div id="break-label">Break Length</div>
                    <div className="d-flex align-items-center">
                        <Button id="break-decrement" onClick={ decrementBreak }>
                            <AiOutlineArrowDown color="cadetblue" className='arrors-clock'/>
                        </Button>
                        <div id="break-length">
                                { breakLength }
                        </div>
                        <Button id="break-increment" onClick={ incrementBreak }>
                            <AiOutlineArrowUp color="cadetblue" className='arrors-clock'/>
                        </Button>
                    </div>    
                </div>
                <div className="d-flex flex-column align-items-center mx-4">
                    <div id="session-label">Session Length</div>
                    <div className="d-flex align-items-center">
                        <Button id="session-decrement" onClick={ decrementSession } >
                            <AiOutlineArrowDown color="cadetblue" className='arrors-clock'/>
                        </Button>
                        <div id="session-length">
                                { sessionLength }
                        </div>
                        <Button id="session-increment" onClick={ incrementSession }>
                            <AiOutlineArrowUp color="cadetblue" className='arrors-clock'/>
                        </Button>
                    </div>
                </div>
            </div>
            
            <TimerComponent breakLength={ breakLength }
                setBreakLength={ setBreakLength }
                sessionLength={ sessionLength }
                setSessionLength={ setSessionLength }
                isTimerRunning={ isTimerRunning }
                setIsTimerRunning={ setIsTimerRunning }
            />   
        </div>
    )
}

export default ClockComponent;