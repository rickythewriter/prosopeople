/*---------------------------------------------------------------------/

There is one top bar
	- Top bar
		- logo
		- search bar
		- account menu
			- log out

There are three panels

	1. Leftmost - Navigation
	2. Left-mid - EntriesWindow
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


/---------------------------------------------------------------------*/

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopNav from '../TopNav';
import './Dashboard.css';

const Dashboard = () => {
	const user = useSelector(state => state.session.user);
	const [ selectedItem, setSelectedItem ] = useState();

	if (user) {
		return (
			<div id="dashboard">
				<div id="container-top-nav">
					<TopNav />
				</div>
				
				<div id="horizontal-panels">
					<div className="horizontal-panel" id="container-navigation">
						{/*<Navigation />*/}
						{/*Nav*/}
					</div>
					
					<div className="horizontal-panel" id="container-entries">
						{/*<Entries />*/}
						{/*Entries*/}
					</div>

					<div className="horizontal-panel" id="container-main-view">
						{/*Main View*/}
					</div>
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