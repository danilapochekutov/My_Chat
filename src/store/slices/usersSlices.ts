import {
	createSlice,
	createEntityAdapter,
	// createSelector,
} from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
	email: null,
	id: null,
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email;
			state.id = action.payload.id;
			// usersAdapter.addOne(state, action.payload);
		},
		removeUser(state) {
			state.email = null;
			state.id = null;
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
