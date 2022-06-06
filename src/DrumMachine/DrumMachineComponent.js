import React, {useRef, useState} from "react";

import '../DrumMachine/DrumMachine.css';
import { Form } from 'react-bootstrap';
import { Slider } from "@mui/material";
import 'rc-slider/assets/index.css';

const HeaterKit = [
    { name: "Heater-1", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', gridArea: 'a', text: 'Q', id: 1 },
    { name: "Heater-2", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', gridArea: 'b', text: 'W', id: 2 },
    { name: "Heater-3", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', gridArea: 'c', text: 'E', id: 3 },
    { name: "Heater-4", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', gridArea: 'd', text: 'A', id: 4 },
    { name: "Clap", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', gridArea: 'e', text: 'S', id: 5 },
    { name: "Open-HH", src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', gridArea: 'f', text: 'D', id: 6 },
    { name: "Kick-n'-Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', gridArea: 'g', text: 'Z', id: 7 },
    { name: "Kick", src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', gridArea: 'h', text: 'X', id: 8 },
    { name: "Closed-HH", src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', gridArea: 'i', text: 'C', id: 9 },
];

const SmoothPianoKit = [
    { name: "Chord-1", src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', gridArea: 'a', text: 'Q', id: 10 },
    { name: "Chord-2", src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3', gridArea: 'b', text: 'W', id: 11 },
    { name: "Chord-3", src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', gridArea: 'c', text: 'E', id: 12 },
    { name: "Shaker", src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3', gridArea: 'd', text: 'A', id: 13 },
    { name: "Open-HH", src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3', gridArea: 'e', text: 'S', id: 14 },
    { name: "Closed-HH", src: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3', gridArea: 'f', text: 'D', id: 15 },
    { name: "Punchy-Kick", src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', gridArea: 'g', text: 'Z', id: 16 },
    { name: "Side-Stick", src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', gridArea: 'h', text: 'X', id: 17 },
    { name: "Snare", src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', gridArea: 'i', text: 'C', id: 18 },
]

const DrumMachineComponent = () => {

    const [power, setPower] = useState(false);
    const [bank, setBank] = useState(false);
    const [volume, setVolume] = useState(0);
    const [display, setDisplay] = useState('');

    const powerOn = () => {

        setPower(prev => !prev)

        if (power === true) {
            setBank(false);
            setVolume(0);
            setDisplay('');
        }
    }

    const changeBank = () => {

        if (power === false) {
            return
        }

        setBank(prev => !prev)

        if (bank === true) {
            setDisplay('Heater Kit')
        } else if (bank === false) {
            setDisplay('Smooth piano kit')
        }  
    }

    const changeVolume = (_, newValue) => {

        if (power === false) {
            return
        }

        setVolume(newValue);
        setDisplay(newValue);

        setTimeout(() => 
        setDisplay('')
        , 3000);
        
    }

    const playAudio = (src, name, event) => {

        let audio = new Audio(src);
        audio.volume = volume / 100;

        if (power === false) {
            return
        } else {
            audio.play()
        }
        setDisplay(name)
    }

    return (
        <div className="parent-drum d-flex align-items-center justify-content-evenly"
            id="drum-machine">
            <div className="grid-drum m-4">
                {
                    HeaterKit.map(el => (
                        <div key={ el.id }
                            onClick={ (event) => playAudio(el.src, el.name) }>
                            { el.text }
                        </div>
                    ))
                }                
            </div>

            <div className="d-flex flex-column">

                <Form className="d-flex flex-column align-items-center">
                    <div>Power</div>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        onChange={ powerOn }
                    />
                </Form>

                <div className="display-drum d-flex flex-column align-items-center"
                    id="display">
                        { display }
                </div>

                <Slider step={ 1 }
                    min={ 0 }
                    max={ 100 }
                    value={ volume }
                    onChange={ changeVolume }
                />

                <Form className="d-flex flex-column align-items-center">
                    <div>Bank</div>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        value={ bank }
                        checked={ bank } // if true checked else !checked
                        onChange={ changeBank }
                    />
                </Form>
            </div>
        </div>
    )
}

export default DrumMachineComponent;
