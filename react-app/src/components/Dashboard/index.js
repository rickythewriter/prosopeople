/*---------------------------------------------------------------------/
App Dashboard

Responsibilities:
	- Render Dashboard components
		- TopNavBar
		- NavPanel (i.e. horizontal panel leftmost)
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
import SmallMainView from './SmallMainView.js';
import SecondaryNavPanel from './SecondaryNavPanel.js'
import './Dashboard.css';

const Dashboard = () => {

	/* Initialize User information */
	const user = useSelector(state => state.session.user);

	/* 
		Read newEntrySelected state from SecondaryNavPanel;
		Affects SmallMainView
	*/
	const [ newEntrySelected, setNewEntrySelected ] = useState(false)

	/* 
		Listen for whether a Person has been selected. 
		Affects both
			SecondaryNavPanel, and
			SmallMainView
	*/
	const person = useSelector(state => state.person);
	const personValues = Object.values(person);
	const [ personIsSelected, setPersonIsSelected ] = useState(false)
	useEffect(() => {
		setPersonIsSelected(personValues.length)
	}, [person, personValues.length]);

	/* Store filtering tags for  */
	const [tagsFilter, setTagsFilter] = useState([])

	/* Print filter tags when they update */
	useEffect(()=> {
		console.log('TagsFilterCRD has read the following tags as selected: ', tagsFilter)
	},[tagsFilter])

	/*
		Read showTags state from SmallMainView FormPersonRU;
		Determine whether SecondaryNavPanel displays TagsCRD.		
	*/
	const [ showTags, setShowTags ] = useState(false)

	/* 
		Determine views right of the NavPanel.
		Previously contained a LargeMainView option.
	*/
	const horizontalPanelsRight = () => {
		return (
			<div id="horizontal-panels-R">	
				<SecondaryNavPanel	
					personIsSelected={personIsSelected}
					setNewEntrySelected={setNewEntrySelected}
					showTags={showTags}
					tagsFilter={tagsFilter}
					setTagsFilter={setTagsFilter}
				/>
			 	<SmallMainView
			 		personIsSelected={personIsSelected}
			 		newEntrySelected={newEntrySelected}
			 		showTags={showTags}
			 		setShowTags={setShowTags}
			 	/>
			</div>
		)
	}

	/*  Render the Dashboard view */
	if (user) {
		return (
			<div id="dashboard">
				<div id="container-top-nav">
					<TopNav />
				</div>
				
				<div id="horizontal-panels-LR">
					<div className="horizontal-panel" id="container-navigation">
						<NavPanel 
							setNewEntrySelected={setNewEntrySelected}
						/>
					</div>
					
					{horizontalPanelsRight()}
					
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