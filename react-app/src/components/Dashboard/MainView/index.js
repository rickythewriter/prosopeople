/*---------------------------------------------------------------------/

	The main responsibility of MainView is:
		Determine which view to show on right half of dashboard.

	States:

		If there is no person selected,
			show FormPersonCreate

		If there is no entry selected and no new entry selected, 
			show FormPersonRU.

		If there is new entry selectd, 
			show FormEntryCreate.

		If there is an entry selected, 
			show FormEntryRUD.

/---------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormPersonCreate from './FormPersonCreate'
import FormPersonRU from './FormPersonRU'
import FormEntryCreate from './FormEntryCreate'
import FormEntryRUD from './FormEntryRUD'

const MainView = ({personIsSelected, newEntrySelected, showTags, setShowTags}) => {

	/* Initialize user information */
	const user = useSelector(state => state.session.user);


	/* 
		Read state for whether an entry has been selected 

		Note: Managed here, because state only affects MainView
	*/
	const entryObj = useSelector(state => state.entry);
	const entry = Object.values(entryObj);
	const [ entryIsSelected, setEntryIsSelected ] = useState(entry.length)

	useEffect(()=> {
		setEntryIsSelected(entry.length)
	}, [entryObj, entry.length]);


	/* Determine which form to display on MainView */
	const MainView = () => {
		if (!personIsSelected) {
			return (
				<FormPersonCreate user={user} />
			)
		} else if (entryIsSelected){
			return (
				<FormEntryRUD />
			)
		} else if (newEntrySelected){
			return (
				<FormEntryCreate />
			)
		} else {
			return (
				<FormPersonRU 
					user={user} 
					showTags={showTags}
					setShowTags={setShowTags}
				/>
			)
		}
	}

	return (
		<div className="horizontal-panel-R horizontal-panel" id="container-main-view">
			{MainView()}
		</div>
	)


}

export default MainView;