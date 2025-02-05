import { toast } from "react-toastify";

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
			eventRegistrarions: []
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
						toast.success('Registro completado!')
						return true;
					} else {
						const errorData = await response.json();
						console.error("Registration error:", errorData.msg);
						toast.error('Ha ocurrido un error en el registro.')
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
						setStore({ message: data.message, error: data.error, isAuthenticated: true })
						toast.success("Inicio de sesión completado!")
						return true;
					} else {
						const errorData = await response.json();
						console.error(errorData.error)
						toast.error("Hubo un error en el inicio de sesión.")
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
				toast.success('Cierre de sesión completado!')
			},

			getEvents: async () => {

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
						toast.success(data.message)
						setStore({ events: [...store.events, data] });
					} else {
						const errorData = await response.json();
						toast.error(errorData.error)
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
						toast.success(data.message)
						setStore({ userDetails: data.user, message: data.message });
					} else {
						const errorData = await response.json();
						toast.error(errorData.error)
						setStore({ error: errorData.error })
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
					const data = await response.json()
					if (response.ok) {
						const store = getStore();
						const newFavorites = [...store.favorites, { event_id }];
						toast.success(data.message)
						setStore({ favorites: newFavorites });
					} else {
						toast.error(data.error)
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
					const data = await response.json()
					if (response.ok) {
						const store = getStore();
						const { favorites } = store;
						toast.success(data.message)
						const updatedFavorites = favorites.filter((fav) => fav.event_id !== event_id);
						setStore({ favorites: updatedFavorites });
					} else {
						const errorData = await response.json();
						toast.error(errorData.error)
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
						toast.success(data.message)
						setStore({ favorites: data.favorites });
					} else {
						const errorData = await response.json();
						toast.error(errorData.error)
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
						toast.success(data.message)
						setStore({ message: data.message });
					} else {
						toast.error(data.error)
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
						toast.success(data.message)
					} else {
						toast.error(data.error)

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
						console.log("registro fallido")
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
					setStore({ error: "Error de servidor al cancelar el registro" });
				}
			},

			getEventRegistrations: async (event_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${event_id}/registrations`);

					if (response.ok) {
						const data = await response.json();
						setStore({ eventRegistrarions: data.registrations });
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