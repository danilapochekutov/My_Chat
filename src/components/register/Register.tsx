import Form from "../form/Form";
import { LOGIN_ROUTE, CHAT_ROUTE } from "../../utils/consts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

//Redux
import { setUser } from "../../store/slices/usersSlices";

import {ISubmitHandler} from '../../utils/types'

import "./register.scss";
import "./mediaRegister.scss";


const Register = () => {
	const navigate = useNavigate();
	const onSubmitRegister: ISubmitHandler = async (
		auth,
		email,
		password,
		setErrorLogin,
		dispatch
	) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password).then(
				({ user }) => {
					dispatch(
						setUser({
							email: user.email,
							id: user.uid,
						})
					);
				}
			);
			navigate(CHAT_ROUTE);
		} catch (error) {
			setErrorLogin(true);
		}
	};

	return Form({
		classLabel: "register",
		label: "Register",
		link: "Login",
		onSubmit: onSubmitRegister,
		route: LOGIN_ROUTE,
		googlButtom: null,
		errorMessage: "Такой пользователь уже зарегистрирован!",
	});
};
export default Register;
