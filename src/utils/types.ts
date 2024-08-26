import { Dispatch } from "redux";

export interface ILoginAction {
	type: string;
	payload: {
		email: string;
		id: string;
	};
}

export interface ISubmitHandler {
	(
		auth: any,
		email: string,
		password: string,
		setErrorLogin: React.Dispatch<React.SetStateAction<boolean>>,
		dispatch: Dispatch<ILoginAction>
	): void;
}

export interface IgoogleButtom {
	(login: React.MouseEventHandler<HTMLButtonElement>): JSX.Element;
}

export interface IFormProps {
	classLabel: string;
	label: string;
	link: string;
	onSubmit: ISubmitHandler;
	route: string;
	googlButtom?: null | IgoogleButtom;
	errorMessage: string;
}
