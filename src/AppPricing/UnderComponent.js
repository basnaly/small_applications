import React from "react";
import DoneIcon from "@mui/icons-material/Done";

const styles = {
	icon: {
		color: "#1976d2",
		fontSize: "16px",
		paddingRight: "4px",
	},
	button: {
		backgroundColor: "#1976d2",
		color: "white",
		padding: '5px 10px',
		borderRadius: '20px',
	}
};

const UnderComponent = () => {
	return (
		<div className="d-flex align-items-center w-75">
			<div className="d-flex flex-column w-75">
				<div className="d-flex">
					<span style={styles.icon}>
						<DoneIcon />
					</span>
					Unlimited websites
				</div>
				<div className="d-flex">
					<span style={styles.icon}>
						<DoneIcon />
					</span>
					100% data ownsership
				</div>
				<div className="d-flex">
					<span style={styles.icon}>
						<DoneIcon />
					</span>
					Email reports
				</div>
			</div>
			<div className="d-flex flex-end"
				style={styles.button}>
				Start my trial
			</div>
		</div>
	);
};

export default UnderComponent;
