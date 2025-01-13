const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		events: [],
	  },
	  actions: {
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
	  },
	};
  };
  
  export default getState;