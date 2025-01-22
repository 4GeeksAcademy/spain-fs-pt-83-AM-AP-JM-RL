const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			events: [],
			favorites: [],
			userDetails: [],
			eventCreatorData: []
		},
		actions: {
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
			},

			getEvents: async () => {
				const store = getStore();
				if (store.events.length === 0) {
					try {
						const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
						if (response.ok) {
							const data = await response.json();
							setStore({ events: data });
						} else {
							console.error("Error fetching events");
						}
					} catch (error) {
						console.error("Error fetching events:", error);
					}
				}
			},

			createEvent: async (formData) => {
				const token = sessionStorage.getItem("access_token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/events`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(formData),
					});

					if (response.ok) {
						const data = await response.json();
						const store = getStore();
						setStore({ events: [...store.events, data] });
					} else {
						const errorData = await response.json();
						console.error("Error creating event:", errorData.msg);
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
						console.error("Error fetching user details:", errorData.msg);
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
						console.error("Error updating user:", errorData.msg);
					}
				} catch (error) {
					console.error("Error updating user:", error);
				}
			},

			addFavorite: async (user_id, event_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/favorite`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ user_id, event_id }),
					});

					if (response.ok) {
						const newFavorite = await response.json();
						const store = getStore();
						setStore({ favorites: [...store.favorites, newFavorite] });
						return newFavorite;
					} else {
						const errorData = await response.json();
						console.error("Error adding favorite:", errorData.msg);
					}
				} catch (error) {
					console.error("Error adding favorite:", error);
				}
			},

			removeFavorite: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/favorite/${id}`, {
						method: "DELETE",
					});

					if (response.ok) {
						const store = getStore();
						setStore({ favorites: store.favorites.filter((fav) => fav.id !== id) });
					} else {
						const errorData = await response.json();
						console.error("Error removing favorite:", errorData.msg);
					}
				} catch (error) {
					console.error("Error removing favorite:", error);
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
		},
	};
};

export default getState;
