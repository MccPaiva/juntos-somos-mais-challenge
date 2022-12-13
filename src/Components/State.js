import React from "react";
import "../style.css";

export default function State(props) {

	return (
		<div>
        	<input type="checkbox" id={props.stateName} 
        	name={props.stateName} value={props.name}
        	onChange={props.toggleStateSelection}/>
        	<label htmlFor={props.stateName}>{props.stateName}</label>
        </div>
	)
}