import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import {
	privateRoutes,
	publicRoutes,
	publicRegistRoutes,
} from "../routes/routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import Louder from "../louder/Louder";

const AppRouter = () => {
	const { isAuth } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000); // 1 сек задержки перед редиректом
	}, []);

	if (loading) return <Louder />;

	return (
		<Routes>
			{isAuth
				? privateRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))
				: publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			{publicRegistRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}

			<Route path="*" element={<Navigate to={isAuth ? CHAT_ROUTE : LOGIN_ROUTE} replace />} />
		</Routes>
	);
};

export default AppRouter;
