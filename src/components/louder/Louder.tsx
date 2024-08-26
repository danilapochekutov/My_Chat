import { Container, Grid } from "@mui/material";
import "./louder.css";

const Louder = () => {
	return (
		<Container>
			<Grid
				container
				style={{ height: window.innerHeight - 50 }}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Grid container alignItems={"center"} justifyContent={"center"}>
					<span className="loader"></span>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Louder;
