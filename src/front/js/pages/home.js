import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carousel";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Eventos</h1>
			<Carousel />
		</div>
	);
};
