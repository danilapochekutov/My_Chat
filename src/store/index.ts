import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./slices/usersSlices";

const store = configureStore({
	reducer: {
		user: userReduser,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
