import {FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

//Redux
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setUser } from "../../store/slices/usersSlices";

import {
	Box,
	Container,
	Grid,
	IconButton,
	InputAdornment,
	Checkbox,
	Button,
	TextField,
	FormControl,
	InputLabel,
	OutlinedInput,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { color } from "../../utils/variables";

import key from  "../../resources/icon/key.png";
import post from "../../resources/icon/post.png";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {IFormProps} from '../../utils/types'

const Form: FC<IFormProps> = ({
	classLabel,
	label,
	link,
	onSubmit,
	route,
	googlButtom,
	errorMessage,
}) => {
	const auth = getAuth();
	const dispatch = useAppDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [errorLogin, setErrorLogin] = useState(false);
	const [loginGoogle, setLoginGoogle] = useState(true);
	const [cookiesLoaded, setCookiesLoaded] = useState(false);
	const [submitClicked, setSubmitClicked] = useState(false);

	const login = async () => {
		setLoginGoogle(false);
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider).then(async ({ user }) => {
			const token = await user.getIdToken();
			dispatch(
				setUser({
					email: user.email,
					id: user.uid,
					token: token
				})
			);
		});
		setLoginGoogle(true);
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Неправильный email адрес!")
				.required("Обязательное поле!"),
			password: Yup.string()
				.required("Обязательное поле!")
				.min(6, "Пароль должен содержать не менее 6 символов!"),
		}),
		onSubmit: async (values) => {
			setErrorLogin(false);
			!loginGoogle
				? setSubmitClicked(true)
				: await onSubmit(
						auth,
						values.email,
						values.password,
						setErrorLogin,
						dispatch
				  );
		},
	});

	useEffect(() => {
		const savedEmail = Cookies.get("login");
		const savedPassword = Cookies.get("password");

		if (!cookiesLoaded && (savedEmail || savedPassword)) {
			formik.setFieldValue("email", savedEmail || formik.values.email);
			formik.setFieldValue(
				"password",
				savedPassword || formik.values.password
			);
			setCookiesLoaded(true);
		}

		if (formik.values.rememberMe) {
			saveCredentialsToCookies(
				formik.values.email,
				formik.values.password
			);
		}
	}, [formik.values, formik.setFieldValue, formik.values.rememberMe]);

	const toggleShowPassword = () => {
		setShowPassword((prevShow) => !prevShow);
	};

	const saveCredentialsToCookies = (login: string, password: string) => {
		document.cookie = `login=${login}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
		document.cookie = `password=${password}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
	};

	const handleCheckboxChange = () => {
		const newRememberMe = !formik.values.rememberMe;

		formik.setFieldValue("rememberMe", newRememberMe);
	};

	return (
		<form className={classLabel} onSubmit={formik.handleSubmit}>
			<Container>
				<Grid
					className="grid"
					container
					style={{ height: window.innerHeight - 65 }}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Grid
						className={`${classLabel}__wrapper`}
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
						style={{ maxWidth: "70%" }}
					>
						<div className={`${classLabel}__titles`}>
							<h2 className={`${classLabel}__subTitle`}>
								Welcome to
							</h2>
							<h1 className="login__title">MyChat</h1>
						</div>
						{googlButtom ? googlButtom(login) : null}

						<Box
							className={`${classLabel}__email`}
							sx={{
								"& .MuiTextField-root": {
									width: "631px",
									position: "relative",
									"& .MuiInputLabel-root": {
										color: "initial",
									},
									"& .MuiOutlinedInput-root": {
										"& fieldset": {
											transition: "border-color 0.3s",
										},
										"&:hover fieldset": {
											borderColor: color,
										},
										"&.Mui-focused fieldset": {
											borderColor: color,
										},
									},
								},
								"& .MuiInputLabel-root.Mui-focused": {
									color: color,
								},
							}}
							
						>
							<div className={`${classLabel}__email_wrap`}>
								<img src={post} alt="post" />
								<TextField
									name="email"
									type="email"
									id="outlined-multiline-flexible"
									label="Email"
									// multiline
									maxRows={1}
									autoComplete="email"
									value={formik.values.email}
									onChange={(e) => {
										formik.handleChange(e);
										setSubmitClicked(false); // Сбросить флаг нажатия кнопки при изменении поля
									}}
									onBlur={formik.handleBlur}
									InputProps={{ inputProps: { noValidate: true } }}
								/>
							</div>
							{loginGoogle &&
							formik.errors.email &&
							formik.touched.email ? (
								<div
									className={`${classLabel}__email_error error`}
								>
									{formik.errors.email}
								</div>
							) : null}
						</Box>
						<FormControl
							className={`${classLabel}__password`}
							sx={{
								position: "relative",
								"& .MuiInputLabel-root": {
									color: "initial",
								},
								"& .MuiOutlinedInput-root": {
									"& fieldset": {
										transition: "border-color 0.3s",
									},
									"&:hover fieldset": {
										borderColor: color,
									},
									"&.Mui-focused fieldset": {
										borderColor: color,
									},
								},
								"& .MuiInputLabel-root.Mui-focused": {
									color: color,
								},
							}}
						>
							<div className={`${classLabel}__password_wrap`}>
								<img src={key} alt="key" />
								<InputLabel
									className={`${classLabel}__password_label`}
									htmlFor="outlined-adornment-password"
								>
									Password
								</InputLabel>
								<OutlinedInput
									name="password"
									type={showPassword ? "text" : "password"}
									style={{ width: "634px" }}
									id="outlined-adornment-password"
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={toggleShowPassword}
												// onMouseDown={
												// 	handleMouseDownPassword
												// }
												edge="end"
											>
												{showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									}
									label="Password"
									autoComplete="current-password"
									value={formik.values.password}
									onChange={(e) => {
										formik.handleChange(e);
										setSubmitClicked(false);
									}}
									onBlur={formik.handleBlur}
								/>
							</div>

							{loginGoogle &&
							errorLogin &&
							submitClicked &&
							formik.values.password !== "" &&
							formik.values.email !== "" &&
							!formik.errors.password &&
							!formik.errors.email ? (
								<div
									className={`${classLabel}__password_error error`}
								>
									{errorMessage}
								</div>
							) : null}

							{loginGoogle &&
							formik.errors.password &&
							formik.touched.password ? (
								<div
									className={`${classLabel}__password_error error`}
								>
									{formik.errors.password}
								</div>
							) : null}
						</FormControl>
						<div className={`${classLabel}__checkbox`}>
							<Checkbox
								checked={formik.values.rememberMe}
								onChange={handleCheckboxChange}
								name="rememberMe"
								inputProps={{
									"aria-label": "controlled",
								}}
								color="default"
							/>
							<span>Remember me</span>
						</div>
						<Button
							className="login__submit"
							type="submit"
							style={{
								// width: "671px",
								// height: "77px",
								backgroundColor: color,
							}}
							variant="contained"
							onClick={() => setSubmitClicked(true)}
						>
							{label}
						</Button>
						<div className={`${classLabel}__${link}`}>
							Don’t have an account?
							<NavLink
								// variant="outlined"
								style={{
									textDecoration: "none",
									borderColor: "#ffff",
								}}
								to={route}
								replace
							>
								{link}
							</NavLink>
						</div>
					</Grid>
				</Grid>
			</Container>
		</form>
	);
};

export default Form;
