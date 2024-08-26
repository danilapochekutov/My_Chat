import { CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../../utils/consts";
import Chat from "../chat/Chat";
import Login from "../login/Login";
import Register from "../register/Register";

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: Login,
	},
];

export const privateRoutes = [
	{
		path: CHAT_ROUTE,
		Component: Chat,
	},
];

export const publicRegistRoutes = [
	{
		path: REGISTER_ROUTE,
		Component: Register,
	},
];
