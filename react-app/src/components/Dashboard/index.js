/*---------------------------------------------------------------------/
App Dashboard

Responsibilities:
	- Render Dashboard components
		- TopNavBar
		- LeftMenu (i.e. horizontal panel leftmost)
		- right horizontal panels
	- Manage variables 
		- that affect two or more Dashboard components' views, or
		- where one Dashboard component communicates to another.
		- Note: 
			if state
				- affects one menu, and
				- can be read from the state,
			then it will be managed inside the component, and not here.

Blueprint

	There is one Top Nav bar
		- name of app
		- logo
		- account menu
			- settings
			- log out

	There are two vertical columns of panels

		1. Left - Nav Panel
		2. Right - horizontalPanelsRight
			- large main view, or
			- secondary navigation + MainView

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
import TopNav from './TopNav';
import LeftMenu from './LeftMenu';
import MainView from './MainView';
import RightMenu from './RightMenu'
import './Dashboard.css';

const Dashboard = () => {

	/* Initialize User information */
	const user = useSelector(state => state.session.user);

	/* 
		Read newEntrySelected state from RightMenu;
		Affects MainView
	*/
	const [ newEntrySelected, setNewEntrySelected ] = useState(false)

	/* 
		Listen for whether a Person has been selected. 
		Affects both
			RightMenu, and
			MainView
	*/
	const person = useSelector(state => state.person);
	const personValues = Object.values(person);
	const [ personIsSelected, setPersonIsSelected ] = useState(false)
	useEffect(() => {
		setPersonIsSelected(personValues.length)
	}, [person, personValues.length]);

	/*
		Read showTags state from MainView FormPersonRU;
		Determine whether RightMenu displays TagsCRD.		
	*/
	const [ showTags, setShowTags ] = useState(false)

	/*  Render the Dashboard view */
	if (user) {
		return (
			<div id="dashboard">
				<div id="container-top-nav">
					<TopNav />
				</div>
				<div id="dashboard-body">
					<div className="horizontal-panel" id="container-left-menu">
						<LeftMenu
							setNewEntrySelected={setNewEntrySelected}
						/>
					</div>
					<div className="horizontal-panel" id="container-right-menu">
						<RightMenu
							personIsSelected={personIsSelected}
							setNewEntrySelected={setNewEntrySelected}
							showTags={showTags}
						/>
					</div>
					<div className="horizontal-panel" id="container-main-view">
						<MainView
							personIsSelected={personIsSelected}
							newEntrySelected={newEntrySelected}
							showTags={showTags}
							setShowTags={setShowTags}
						/>
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