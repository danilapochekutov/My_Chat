import Form from "../form/Form";
import { REGISTER_ROUTE } from "../../utils/consts";
import { signInWithEmailAndPassword } from "firebase/auth";

import google from "../../resources/icon/google.png";

import "./login.scss";
import "./mediaLogin.scss";

import { ISubmitHandler, IgoogleButtom } from '../../utils/types';

const Login = () => {
  const onSubmitLogin: ISubmitHandler = async (
    auth,
    email,
    password,
    setErrorLogin
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorLogin(true);
    }
  };

  const googleLogin: IgoogleButtom = (login) => {
    return (
      <div>
        <button className="login__google" onClick={login} type="submit">
          <img src={google} alt="google" />
          Login with Google
        </button>
        <div className="login__line">
          <span></span>
          OR
          <span></span>
        </div>
      </div>
    );
  };

  return Form({
    classLabel: "login",
    label: "Login",
    link: "Register",
    onSubmit: onSubmitLogin,
    route: REGISTER_ROUTE,
    googlButtom: googleLogin,
    errorMessage: "Не правильный логин или пароль!",
  });
};

export default Login;