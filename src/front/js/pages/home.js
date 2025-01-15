import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carousel";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const sortByMostRecent = (a, b) => new Date(b.created_at) - new Date(a.created_at);
	const sortByUpcoming = (a, b) => new Date(a.date) - new Date(b.date);
	const filterFreeEvents = (event) => event.price === 0;

	useEffect(() => {
		actions.getEvents(); // Fetch events when the app loads
	  }, [actions]);

	return (
		<div className="container">
<h3>Recently Added</h3>
			<Carousel
				title="Most Recently Added Events"
				sort={sortByMostRecent}
			/>
<h3>Upcoming events</h3>
			<Carousel
				title="Upcoming Events"
				sort={sortByUpcoming}
			/>
<h3>Free</h3>
			<Carousel
				title="Free Events"
				filter={filterFreeEvents}
			/>
		</div>
	);
};