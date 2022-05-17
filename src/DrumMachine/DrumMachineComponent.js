import React, {useRef, useState} from "react";

import '../DrumMachine/DrumMachine.css';
import { Form } from 'react-bootstrap';
import { Slider } from "@mui/material";
import 'rc-slider/assets/index.css';

const HeaterKit = [
    { name: "Heater-1", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', gridArea: 'a', text: 'Q' },
    { name: "Heater-2", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', gridArea: 'b', text: 'W' },
    { name: "Heater-3", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', gridArea: 'c', text: 'E' },
    { name: "Heater-4", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', gridArea: 'd', text: 'A' },
    { name: "Clap", src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', gridArea: 'e', text: 'S' },
    { name: "Open-HH", src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', gridArea: 'f', text: 'D' },
    { name: "Kick-n'-Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', gridArea: 'g', text: 'Z' },
    { name: "Kick", src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', gridArea: 'h', text: 'X' },
    { name: "Closed-HH", src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', gridArea: 'i', text: 'C' },
];

const SmoothPianoKit = [
    { name: "Chord-1", src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', gridArea: 'a', text: 'Q' },
    { name: "Chord-2", src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3', gridArea: 'b', text: 'W' },
    { name: "Chord-3", src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', gridArea: 'c', text: 'E' },
    { name: "Shaker", src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3', gridArea: 'd', text: 'A' },
    { name: "Open-HH", src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3', gridArea: 'e', text: 'S' },
    { name: "Closed-HH", src: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3', gridArea: 'f', text: 'D' },
    { name: "Punchy-Kick", src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', gridArea: 'g', text: 'Z' },
    { name: "Side-Stick", src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', gridArea: 'h', text: 'X' },
    { name: "Snare", src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', gridArea: 'i', text: 'C' },
]

const DrumMachineComponent = () => {

    const [power, setPower] = useState(false);
    const [display, setDisplay] = useState('');
    const [volume, setVolume] = useState(50);
    const [bank, setBank] = useState(false);

    const timer = useRef(); //not refresh DOM, not changes berween renders

    const changeVolume = (_, value) => {

        if (power === false) {
            return
        }

        setDisplay('Volume: ' + value);

        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            setDisplay('');
        }, 3000)

        setVolume(value)
    }

    const playAudio = (src, id, event) => {
        
        if (power === false) {
            return
        }

        // 1-st
        const audio = new Audio(src);
        audio.volume = volume / 100; 
        audio.play();

        //2-nd
        // const audio = event.target.children[0]
        // audio.volume = volume / 100; 
        // audio.play();
        
        setDisplay(id.replaceAll('-', ' '))
    }
    
    const changeAudioKit = (_, value) => {

        if (power === false) {
            return
        }

        setBank(!bank); //toggle

        if (!bank) {
            setDisplay('Heater Kit');
        } else {
            setDisplay('Smooth Piano Kit');
        }    
    }

    return (
        <div className="parent-drum d-flex align-items-center justify-content-evenly"
            id="drum-machine">
            <div className="grid-drum m-4">
                {
                    (bank ? SmoothPianoKit : HeaterKit).map(el => (
                        <div className="drum-pad"
                            id={ el.name }
                            key={ el.name }
                            style={ {gridArea: el.gridArea} }
                            onClick={ (event) => playAudio(el.src, el.name, event) }>      
                            <audio id={ el.text } 
                                src={ el.src }
                                className='clip'>
                            </audio>
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
                        value={ power }
                        checked={ power }
                        onChange={ () => setPower(!power) }
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
                        checked={ bank }
                        onChange={ changeAudioKit }
                    />
                </Form>

            </div>
        </div>
    )
}

export default DrumMachineComponent;
