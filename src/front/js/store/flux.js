const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			events: [],
			favorites: [],
		},
		actions: {
			register: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/users`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("Usuario registrado:", data);
						return true;
					} else {
						const errorData = await response.json();
						console.log("Error en el registro:", errorData.msg);
						return false;
					}
				} catch (e) {
					console.error("Error al registrar", e);
					return false;
				}
			},

			login: async (email, password) => {
				try {
					const token = await fetch(`${process.env.BACKEND_URL}api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});

					if (token.ok) {
						const data = await token.json();
						sessionStorage.setItem("access_token", data.token);
						console.log("Usuario logeado:", data);
						return true;
					} else {
						const errorData = await token.json();
						console.error("Error en el logeo:", errorData.msg);
						return false;
					}
				} catch (e) {
					console.error("Error during login", e);
					return false;
				}
			},

			getEvents: async () => {
				const store = getStore();
				if (store.events.length === 0) {
					try {
						const resp = await fetch(process.env.BACKEND_URL + "/api/events");
						const respJson = await resp.json();
						setStore({ events: respJson });
					} catch (error) {
						console.error("Error fetching events:", error);
					}
				}
			},

			createEvent: async (formData) => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/events", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token,
						},
						body: JSON.stringify(formData),
					});

					if (response.ok) {
						const data = await response.json();
						const store = getStore();
						setStore({ events: [...store.events, data] });
					} else {
						const errorData = await response.json();
						console.error("Error creating event:", errorData);
					}
				} catch (error) {
					console.error("Error creating event:", error);
				}
			},
			getEvents: async () => {
				const store = getStore();
				if (store.events.length === 0) {
					try {
						const resp = await fetch(process.env.BACKEND_URL + "/api/events");
						const respJson = await resp.json();
						setStore({ events: respJson });
					} catch (error) {
						console.error("Error fetching events:", error);
					}
				}

			},

			addFavorite: async (user_id, event_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/favorite`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							user_id: user_id,
							event_id: event_id
						})
					});
			
					if (!response.ok) {
						throw new Error(`Failed to add favorite: ${response.statusText}`);
					}
			
					const newFavorite = await response.json();
			
					
					const store = getStore();
					setStore({ favorites: [...store.favorites, newFavorite] });
			
					return newFavorite;
				} catch (error) {
					console.error("Error adding favorite:", error);
					throw error;
				}
			},
			
			removeFavorite: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/favorite/${id}`, {
						method: "DELETE"
					});
			
					if (!response.ok) {
						throw new Error(`Failed to remove favorite: ${response.statusText}`);
					}
			
					const store = getStore();
					const updatedFavorites = store.favorites.filter((fav) => fav.id !== id);
					setStore({ favorites: updatedFavorites });
			
					return id; 
				} catch (error) {
					console.error("Error removing favorite:", error);
					throw error;
				}
			}

		},


		
		

	}
}


export default getState;
