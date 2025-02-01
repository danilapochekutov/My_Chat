import { useAuth } from "../../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { color } from "../../utils/variables";

const NavBar = () => {
  const { isAuth } = useAuth();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Выход из Firebase
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

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
              onClick={handleLogout}
            >
              Выйти
            </Button>
          ) : <></>}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;