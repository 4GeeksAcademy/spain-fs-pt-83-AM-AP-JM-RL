import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			state.actions.getEvents();
		}, []);

		useEffect(() => {
			if (state.store.isAuthenticated) {
				state.actions.getUserDetails()
			}
		}, [state.store.isAuthenticated, state.store.userDetails.updated_at])

		useEffect(() => {
			state.actions.getEvents();
		}, [state.store.events.length]);

		useEffect(() => {
			state.actions.loadFavorites();
		}, [state.store.favorites.length]);

		useEffect(() => {
			state.actions.clearMessages()
		}, [state.store.message, state.store.error])

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
