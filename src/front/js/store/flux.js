const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		users: [],
		events: [],
		favorites:[]
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
						body: JSON.stringify({email, password})
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
						body: JSON.stringify({email, password})
					}
				);

				if (token.ok) {
					const data = await token.json();
					sessionStorage.setItem("access_token", data.access_token);
					console.log("Usuario logeado:" , data);
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
			setStore({ favorites: event.id});
		}
	  },
	};
  };
  
  export default getState;