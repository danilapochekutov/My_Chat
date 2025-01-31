import { BrowserRouter as Router } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

import NavBar from "../navBar/NavBar";
import AppRouter from "../appRouter/appRouter";
import Louder from "../louder/Louder";

function App() {
	const auth = getAuth();
	const [user, loading, error] = useAuthState(auth);

	return (
		<Router basename="/My_Chat"> {/* Для корректной работы при обновлении страницы */}
			{loading ? (
				<Louder />
			) : (
				<>
					<NavBar />
					<AppRouter />
				</>
			)}
		</Router>
	);
}

export default App;
