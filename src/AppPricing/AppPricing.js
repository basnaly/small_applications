import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SliderComponent from "./SliderComponent";
import UnderComponent from "./UnderComponent";

const styles = {
    text1: {
        fontWeight: 'bold',
        fontSize: '24px',
    },
	border: {
		border: '1px gray solid',
		width: '75%',
		marginTop: '15px',
		marginBottom: '20px',
	},
}

const AppPricing = () => {
	return (
		<div>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					'& > :not(style)': {
					  m: 'auto',
					  marginTop: '100px',
					  width: 700,
					  height: 500,
					},
				  }}
			>
				<Paper elevation={6} >

				  <div className="d-flex flex-column align-items-center">

					<div className="d-flex flex-column align-items-center mt-3"
						style={styles.text1}>
						Simple, traffic-based pricing
					</div>

					<div className="d-flex flex-column align-items-center mt-2">
						Sign-up for our 30-day trial. No credit card required.
					</div>

					<SliderComponent />

					<div style={styles.border}></div>

					<UnderComponent />

				  </div>
				</Paper>
				  
			</Box>
		</div>
	);
};

export default AppPricing;
