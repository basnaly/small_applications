import React from "react";

import '../DrumMachine/DrumMachine.css';
import {
    Form, Dropdown,
    InputGroup, FormControl,
    DropdownButton, Card
} from 'react-bootstrap';
import { Slider } from "@mui/material";
import 'rc-slider/assets/index.css';

const DrumMachineComponent = () => {

    return (
        <div className="parent-drum d-flex align-items-center justify-content-evenly">
            <div className="grid-drum m-4">
                <div className="q shadow"
                    style={{ gridArea: 'a' }}
                    id="q"
                    onClick={() => { }}>
                    Q
                </div>
                <div className="w shadow"
                    style={{ gridArea: 'b' }}
                    id="w"
                    onClick={() => { }}>
                    W
                </div>
                <div className="e shadow"
                    style={{ gridArea: 'c' }}
                    id="e"
                    onClick={() => { }}>
                    E
                </div>
                <div className="a shadow"
                    style={{ gridArea: 'd' }}
                    id="a"
                    onClick={() => { }}>
                    A
                </div>
                <div className="s shadow"
                    style={{ gridArea: 'e' }}
                    id="s"
                    onClick={() => { }}>
                    S
                </div>
                <div className="d shadow"
                    style={{ gridArea: 'f' }}
                    id="d"
                    onClick={() => { }}>
                    D
                </div>
                <div className="z shadow"
                    style={{ gridArea: 'g' }}
                    id="z"
                    onClick={() => { }}>
                    Z
                </div>
                <div className="x shadow"
                    style={{ gridArea: 'h' }}
                    id="x"
                    onClick={() => { }}>
                    X
                </div>
                <div className="c shadow"
                    style={{ gridArea: 'i' }}
                    id="c"
                    onClick={() => { }}>
                    C
                </div>

            </div>
            <div className="d-flex flex-column">
                <Form className="d-flex flex-column align-items-center">
                    <div>Power</div>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                    />
                </Form>
                <div className="display-drum d-flex flex-column align-items-center">
                    Display
                </div>

                <Slider defaultValue={50} 
                    aria-label="Default" 
                    valueLabelDisplay="auto" />

                <Form className="d-flex flex-column align-items-center">
                    <div>Bank</div>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                    />
                </Form>

            </div>


        </div>
    )
}

export default DrumMachineComponent;