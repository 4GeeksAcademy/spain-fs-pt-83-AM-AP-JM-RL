const getState = ({ getStore, getActions, setStore }) => {
	return {

		store: {
			users: [],
			events: [],
		},

		actions: {
			register: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/users`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({ email, password })
						}
					);


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
					const token = await fetch(`${process.env.BACKEND_URL}api/login`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ email, password })
						}
					);

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
				} catch {
					console.error('error')
				}
			},

			getEvents: async () => {
				const store = getStore();
				if (!store.events.length) {
					try {
						const resp = await fetch(process.env.BACKEND_URL + "/api/events");
						const respJson = await resp.json();
						setStore({ events: respJson });
					} catch (error) {
						console.error("Error fetching events:", error);
					}
				}
				console.log(store.events);
			},

			createEvent: async ({ title, description, date, time, price, location, image }) => {
				const token = sessionStorage.getItem("access_token");
				const formData = {}
				formData.title = title;
				formData.description = description;
				formData.date = date;
				formData.time = time;
				formData.price = price;
				formData.location = location;
				formData.image = image;
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/events", {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						},
						body: JSON.stringify(formData)
					})
					if (response.ok) {
						const data = await response.json()
						setStore({ events: [...events, data] })
					} else {
						const errorData = await response.json()
						console.error(errorData)
					}
				} catch (error) {
					console.error(error)
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

			},
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
	};
};

export default getState;