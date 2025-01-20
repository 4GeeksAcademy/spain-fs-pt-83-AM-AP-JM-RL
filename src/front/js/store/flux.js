const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			events: [],
			favorites: [],
			userDetails: []
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

			logout: async () => {
				sessionStorage.removeItem("access_token");
				console.log("Sesion cerrada");
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
			getUserDetails: async () => {
				const token = sessionStorage.getItem('access_token')
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/user-details", {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						}
					})
					if (response.ok) {
						const data = await response.json()
						setStore({ userDetails: data })
					} else {
						const errorData = await response.json()
						console.error('Ha ocurrido un error', errorData)
					}
				} catch (error) {
					console.error('error de servidor', error)
				}
			},
			updateUser: async (formData) => {
				const token = sessionStorage.getItem('access_token')
				try {

					const response = await fetch(process.env.BACKEND_URL + "api/update-user", {
						method: 'PUT',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify(formData)
					})
					if (response.ok) {
						const data = await response.json()
						setStore({ userDetails: data })
					} else {
						const errorData = await response.json()
						console.error(errorData)
					}
				} catch (error) {
					console.error("error de servidor", error)
				}
			},

			// addFavorite: async (item) => {
			// 	const { favorites } = getStore();
			// 	if (!favorites.length) {
			// 		try {
			// 		  const resp = await fetch(process.env.BACKEND_URL + "/api/favorites");
			// 		  const respJson = await resp.json();
			// 		  setStore({ events: respJson });
			// 		} catch (error) {
			// 		  console.error("Error fetching events:", error);
			// 		}
			// 	  }
			// },

			removeFavorite: (id) => {
				const { favorites } = getStore();
				setStore({ favorites: event.id });

			}
			// addFavorite: (item) => {
			// 	const { favorites } = getStore();
			// 	if (!favorites.some(fav => fav.id === item.id && fav.type === item.type)) {
			// 		setStore({ favorites: [...favorites, item] });
			// 	}
			// },

			// removeFavorite: (id, type) => {
			// 	const { favorites } = getStore();
			// 	setStore({ favorites: event.id});
			// }

		},


		addFavorite: async (user_id, event_id) => {
			try {
				const response = await fetch(`${process.env.BACKEND_URL}api/favorites`, {
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

				const data = await response.json();
				return data;
			} catch (error) {
				console.error("Error adding favorite:", error);
				throw error;
			}

		},

		removeFavorite: async (id) => {
			try {

				const response = await fetch(`${process.env.BACKEND_URL}api/favorites/${id}`, {
					method: "DELETE",
				});


				if (!response.ok) {
					throw new Error(`Failed to remove favorite: ${response.statusText}`);
				}


				const store = getStore();
				const updatedFavorites = store.favorites.filter(fav => fav.id !== id);

				// Update the state/store
				setStore({ favorites: updatedFavorites });
			} catch (error) {
				console.error("Error removing favorite:", error);
				throw error;
			}
		}

	}
}


export default getState;
