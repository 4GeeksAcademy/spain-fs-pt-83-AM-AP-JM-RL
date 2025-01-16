const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		users: [],
		events: [],
		favorites:[]
	  },
	  actions: {
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