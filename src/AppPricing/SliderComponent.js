import React, { useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";

const styles = {
    span: {
        fontWeigth: 'bold',
        fontSize: '36px',
    },
    yearly: {
        color: 'red',
    }
}

const discount = 0.8;
const step = 10;

const SliderComponent = () => {

	const [value, setValue] = useState(10);
	const [price, setPrice] = useState(5);
    const [yearlyPrice, setYearlyPrice] = useState(4);
    const [checked, setChecked] = useState(false);

	const changeValue = (_, newValue) => {
		setValue(newValue);

        let monthlyPrice = +((newValue - value) / step + price).toFixed(2);
        setPrice(monthlyPrice);

        setYearlyPrice(+(monthlyPrice * discount).toFixed(2));
	};

    const changeSwitch = event => {
        setChecked(event.target.checked);
    }

	return (
		<div className="d-flex flex-column align-items-center mt-4">
			<div className="d-flex align-items-center justify-content-between w-100">
				<div className="d-flex align-items-center">
					{value}K requests
				</div>

				<div className="d-flex align-items-center">
                    <span style={styles.span}>
                        ${ checked ? yearlyPrice : price}
                    </span> 
                    /month
                </div>
			</div>

            <div className="d-flex align-items-center justify-content-between w-100">

                <div className="d-flex align-items-center">
                    Monthly billing
                </div>

                <Switch
                    checked={checked}
                    onChange={changeSwitch}
                    inputProps={{ "aria-label": "controlled" }}
                />

                <div className="d-flex align-items-center">
                    Yearly billing
                </div>

            </div>

            <div className="d-flex align-items-center mb-4"
                style={styles.yearly}>
                20% discount of yearly billing
            </div>

			<Box sx={{ width: 300 }}>
				<Slider
					aria-label="Price"
					defaultValue={10}
					valueLabelDisplay="auto"
					step={10}
					marks
					min={10}
					max={100}
					onChange={changeValue}
				/>
			</Box>
		</div>
	);
};

export default SliderComponent;
