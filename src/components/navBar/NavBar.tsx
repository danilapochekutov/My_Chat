import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/slices/usersSlices";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { LOGIN_ROUTE } from "../../utils/consts";
import { color } from "../../utils/variables";

const NavBar = () => {
	const dispatch = useDispatch();
	const { isAuth } = useAuth();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar sx={{ backgroundColor: color }} position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					></Typography>
					{isAuth ? (
						<Button
							variant="outlined"
							style={{
								color: "#ffff",
								textDecoration: "none",
								borderColor: "#ffff",
							}}
							onClick={
								() =>
									dispatch(removeUser()) /* auth.signOut() */
							}
						>
							Выйти
						</Button>
					) : (
						<NavLink to={LOGIN_ROUTE} replace>
							{/* <Button
								variant="outlined"
								style={{
									color: "#ffff",
									textDecoration: "none",
									borderColor: "#ffff",
								}}
							>
								Войти
							</Button> */}
						</NavLink>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavBar;
