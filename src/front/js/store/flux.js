const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isAuthenticated: !!sessionStorage.getItem('access_token'),
			users: [],
			events: [],
			favorites: [],
			userDetails: {},
			eventCreatorData: {},
			filteredEvents: [],
			message: null,
			error: null,
			comments: [],
			eventRegistrations: []
		},
		actions: {
			searchEvents: async (formData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/filtered_events', {
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					})
					if (response.ok) {
						const data = await response.json()
						setStore({ filteredEvents: data })
					}
				} catch (error) {
					console.error('Error en servidor', error.message)
				}
			},



			register: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/users`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});

					if (response.ok) {
						const data = await response.json();
						console.log("User registered:", data);
						return true;
					} else {
						const errorData = await response.json();
						console.error("Registration error:", errorData.msg);
						return false;
					}
				} catch (error) {
					console.error("Error during registration:", error);
					return false;
				}
			},

			login: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});

					if (response.ok) {
						const data = await response.json();
						sessionStorage.setItem("access_token", data.token);
						console.log("User logged in:", data);
						setStore({ message: data.message, error: data.error, isAuthenticated: true })
						return true;
					} else {
						const errorData = await response.json();
						console.error("Login error:", errorData.msg);
						return false;
					}
				} catch (error) {
					console.error("Error during login:", error);
					return false;
				}
			},

			logout: () => {
				sessionStorage.removeItem("access_token");
				console.log("Session closed");
				setStore({ message: 'Sesion cerrada correctamente', isAuthenticated: false })
			},

			getEvents: async () => {
				const store = getStore();
				if (store.events.length === 0) {
					try {
						const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
						if (response.ok) {
							const data = await response.json();
							setStore({ events: data, filteredEvents: data });
						} else {
							console.error("Error fetching events");
						}
					} catch (error) {
						console.error("Error fetching events:", error);
					}
				}
			},
			createEvent: async (eventData) => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/events`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(eventData),
					});

					if (response.ok) {
						const data = await response.json();
						const store = getStore();
						setStore({ events: [...store.events, data] });
					} else {
						const errorData = await response.json();
						console.error("Error creating event:", errorData.message);
					}
				} catch (error) {
					console.error("Error creating event:", error);
				}
			},

			getUserDetails: async () => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/user-details`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ userDetails: data });
					} else {
						const errorData = await response.json();
						console.error("Error fetching user details:", errorData.message);
					}
				} catch (error) {
					console.error("Error fetching user details:", error);
				}
			},

			updateUser: async (formData) => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/update-user`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(formData),
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ userDetails: data });
					} else {
						const errorData = await response.json();
						console.error("Error updating user:", errorData.message);
					}
				} catch (error) {
					console.error("Error updating user:", error);
				}
			},

			addFavorite: async (event_id) => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${event_id}/favorites`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`
						},
					});

					if (response.ok) {
						console.log("Favorite added successfully!");
						const store = getStore();
						const newFavorites = [...store.favorites, { event_id }];
						setStore({ favorites: newFavorites });
						console.log("Updated store favorites:", newFavorites);
					} else {
						const errorData = await response.json();
						console.error("Error adding favorite:", errorData.error);
					}
				} catch (error) {
					console.error("Error adding favorite:", error);
				}
			},



			removeFavorite: async (event_id) => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${event_id}/favorites`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`
						},
					});

					if (response.ok) {
						console.log("getStore:", getStore());

						const store = getStore();
						const { favorites } = store;
						console.log("store.favorites:", favorites);

						const updatedFavorites = favorites.filter((fav) => fav.event_id !== event_id);
						console.log("updated favorites:", updatedFavorites);

						setStore({ favorites: updatedFavorites });

						console.log("Removed favorite, updated list:", updatedFavorites);
					} else {
						const errorData = await response.json();
						console.error("Error removing favorite:", errorData.error);
					}
				} catch (error) {
					console.error("Error removing favorite:", error);
				}
			},


			loadFavorites: async () => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/favorites`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`
						},
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ favorites: data.favorites });
						console.log("Loaded favorites from API:", data.favorites);
					} else {
						const errorData = await response.json();
						console.error("Error loading favorites:", errorData.error || errorData.message);
						setStore({ favorites: [] });
					}
				} catch (error) {
					console.error("Error fetching favorites:", error);
				}
			},



			getEventCreatorData: async (event_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/event-creator-details/${event_id}`);
					if (response.ok) {
						const data = await response.json();
						setStore({ eventCreatorData: data });
					} else {
						const errorData = await response.json();
						console.error("Error fetching event creator data:", errorData.msg);
					}
				} catch (error) {
					console.error("Error fetching event creator data:", error);
				}
			},
			addRating: async (rate, userId) => {
				const token = sessionStorage.getItem('access_token');
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/rating/${userId}`, {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify(rate)
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ message: data.message });
					} else {
						setStore({ error: data.error });
					}
				} catch (error) {
					setStore({ error: error.message });
				}
			},
			addComment: async (content, eventId) => {
				const token = sessionStorage.getItem('access_token')
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/new-post/${eventId}`, {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify(content)
					})
					const data = await response.json()
					if (response.ok) {
						setStore({ message: data.message })
					} else {
						setStore({ error: data.error })
					}
				} catch (error) {
					setStore({ error: error.message })
				}
			},
			getPostComments: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/posts/${eventId}`)
					const data = await response.json()
					if (response.ok) {
						setStore({ comments: data })
					} else {
						setStore({ error: data.error })
					}
				} catch (error) {
					setStore({ error: error.message })
				}
			},
			clearMessages: () => {
				setTimeout(() => {
					setStore({ error: null, message: null })
				}, 1500);
			},

			registerToEvent: async (event_id) => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${event_id}/register`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						}
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ message: data.message });
						console.log("registro ok")
						return true;
					} else {
						const errorData = await response.json();
						setStore({ error: errorData.error });
						console.log("registro fallido", errorData)
						return false;
					}
				} catch (e) {
					console.error("Error registro en evento:", e);
					setStore({ error: "Error al registrarse en evento" });
					return false;
				}
			},

			cancelRegisterFromEvent: async (event_id) => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${event_id}/cancelregister`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						}
					}); 

					if (response.ok) {
						const data = await response.json();
						setStore({ message: data.message });
						return true;
					} else {
						const errorData = await response.json();
						setStore({ error: errorData.error });
						return false;
					}
				} catch (e) {
					console.error("Error al cancelar el registro:", e);
					setStore({ error: "Error de servidor al cancelar el registro"});
				}
			},

			getEventRegistrations: async (event_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${event_id}/registrations`);

					if (response.ok) {
						const data = await response.json();
						setStore({ eventRegistrations: data.registrations});
					} else {
						const errorData = await response.json();
						console.error("Error en mostrar registros", errorData.error);
					}
				} catch (e) {
					console.error("Error al mostrar registro", e);
				}
			}

		},
	};
};

export default getState;