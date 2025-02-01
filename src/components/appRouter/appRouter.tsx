import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  privateRoutes,
  publicRoutes,
  publicRegistRoutes,
} from "../routes/routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import Louder from "../louder/Louder";

const AppRouter = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Louder/>
    );
  }

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

      <Route
        path="*"
        element={
          <Navigate to={isAuth ? CHAT_ROUTE : LOGIN_ROUTE} replace />
        }
      />
    </Routes>
  );
};

export default AppRouter;