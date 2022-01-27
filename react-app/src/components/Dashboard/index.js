/*---------------------------------------------------------------------/

There is one top bar
	- Top bar
		- logo
		- search bar
		- account menu
			- log out

There are three panels

	1. Leftmost - NavPanel
	2. Left-mid - SecondaryNavPanel
	3. Rightmost - MainView
		Possible Components:
		• Person's Information
			• Create
			• Edit
		• Group's Information
			- description of group
			- functionality: add people 
		• Edit Entry

States:
	- Person was selected from Navigation
		• Main View shows Person's Information
		• Entries Window shows Person's Entries
	- Group was selected from Navigation
		• Main View shows Group's Information
		• Entries Window shows Group-Wide Entries
		• Navigation shows People who are members of the group
	- Entry was selected from Entries Window
		• Main View shows Read/Edit Entry form


Note: 
The peopleObj follows the following format:
	{ <person's id> : <person object> }

/---------------------------------------------------------------------*/

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopNav from '../TopNav';
import NavPanel from '../NavPanel';
import MainView from '../MainView';
import FormPersonCreate from '../FormPersonCreate'
import './Dashboard.css';

const Dashboard = () => {
	const user = useSelector(state => state.session.user);
	const peopleObj = useSelector(state => state.people);
	const people = Object.values(peopleObj);
	const [selectedItemType, setSelectedItemType] = useState('people');
	const [selectedItemId, setSelectedItemId] = useState();

	const horizontalPanelsRight = (selectedItemType) => {
		switch(selectedItemType){
			case 'person':
				return (
					<div id="horizontal-panels-R">
						<div className="horizontal-panel-R horizontal-panel" id="container-entries">
							{/*<SecondaryNavPanel />*/}
							SecondaryNavPanel
						</div>

						<div className="horizontal-panel-R horizontal-panel" id="container-main-view">
							<MainView user={user} selectedItemType={selectedItemType} selectedItemId={selectedItemId} peopleObj={peopleObj}/>
						</div>
					</div>
				)
				break;
			case 'people':
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
				break;
			default:
				return null
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
							selectedItemType={selectedItemType}
							selectedItemId={selectedItemId}
							setSelectedItemType={setSelectedItemType} 
							setSelectedItemId={setSelectedItemId}
						/>
					</div>
					
					{horizontalPanelsRight(selectedItemType)}
					
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