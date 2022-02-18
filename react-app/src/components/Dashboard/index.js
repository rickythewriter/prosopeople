/*---------------------------------------------------------------------/
App Dashboard Blueprint
(Includes planned additonal features)

There is one Top Nav bar
	- logo
	- search bar
	- account menu
		- settings
		- log out

There are two vertical columns of panels

	1. Left - Nav Panel
	2. Right - horizontalPanelsRight
		- large main view, or
		- secondary navigation + SmallMainView

States:
	- Person was selected from Navigation
		• Small Main View shows Person's Information
		• Entries Menu shows Person's Entries
	- Entry was selected from Entries Window
		• Main View shows Read/Edit Entry form
		• Entries Menu shows Person's Entries


Note: 
	The peopleObj follows the following format:
		{ <person's id> : <person object> }

/---------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopNav from '../TopNav';
import NavPanel from '../NavPanel';
import EntriesMenu from '../EntriesMenu';
import SmallMainView from '../SmallMainView';
import FormPersonCreate from '../FormPersonCreate'
import './Dashboard.css';

const Dashboard = () => {
	const user = useSelector(state => state.session.user);
	const peopleObj = useSelector(state => state.people);
	const people = Object.values(peopleObj);
	const person = useSelector(state => state.person);
	const personValues = Object.values(person);
	const [ personIsSelected, setPersonIsSelected ] = useState(false)
	const [ newEntrySelected, setNewEntrySelected ] = useState(false)

	/* Listen for whether a dossier has been selected */
	useEffect(()=> {
		setPersonIsSelected(personValues.length)
	}, [person, personValues.length]);

	const horizontalPanelsRight = () => {
		if ( personIsSelected ) {
			return (
				<div id="horizontal-panels-R">	
					<EntriesMenu setNewEntrySelected={setNewEntrySelected} />
					<SmallMainView newEntrySelected={newEntrySelected}/>
				</div>
			)
		} else {
			return (
				<div 
					id="horizontal-panel-large-R"
				>
					 <div 
					 	className="horizontal-panel-R horizontal-panel"
					 	id="container-main-view"
					 >
					 	<FormPersonCreate user={user}/>
					</div>
				</div>
			)
		}
	}


	if (user) {
		return (
			<div id="dashboard">
				<div id="container-top-nav">
					<TopNav />
				</div>
				
				<div id="horizontal-panels-LR">
					<div className="horizontal-panel" id="container-navigation">
						<NavPanel 
							user={user} 
							people={people}
							setNewEntrySelected={setNewEntrySelected}
						/>
					</div>
					
					{horizontalPanelsRight(person)}
					
				</div>
			</div>
		);
	} else {
		return (
			<Redirect to="/" />
		)
	}


}

export default Dashboard;