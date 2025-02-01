import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { setUser, removeUser } from "../store/slices/usersSlices";

export function useAuth() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const { email, id } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    // Подписываемся на изменения состояния аутентификации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Пользователь авторизован
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          })
        );
      } else {
        // Пользователь не авторизован
        dispatch(removeUser());
      }
      setIsLoading(false); // Завершаем загрузку
    });

    // Отписываемся от изменений при размонтировании компонента
    return () => unsubscribe();
  }, [auth, dispatch]);

  return {
    isAuth: !!email, // Проверяем, авторизован ли пользователь
    isLoading, // Возвращаем состояние загрузки
    email,
    id,
  };
}