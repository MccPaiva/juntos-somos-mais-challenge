import React from "react";
import "../style.css";

export default function profile(props) {

	let splitAdress = props.adress.split(/ (.*)/);
	let fixedAdress = `${splitAdress[1].trim()}, ${splitAdress[0]}`;

	return (
		<div className="profile">
			<img src={props.picture}></img>
			<h1>{props.firstName} {props.lastName}</h1>
			<p className="adress">{fixedAdress}</p>
			<p className="other-info">{props.city}</p>
			<p className="other-info">{props.state} - CEP: {props.postcode}</p>
		</div>
	)
}