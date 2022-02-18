/*---------------------------------------------------------------------/

	If there is no entry selected and no new entry selected, show person edit view.

	If there is new entry selectd, show new entry form.

	If there is an entry selected, show entry edit view.

/---------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormPersonRU from '../FormPersonRU'
import FormEntryCreate from '../FormEntryCreate'
import FormEntryRUD from '../FormEntryRUD'

const SmallMainView = ({newEntrySelected}) => {
	const user = useSelector(state => state.session.user);
	const entryObj = useSelector(state => state.entry);
	const entry = Object.values(entryObj);
	const [ entryIsSelected, setEntryIsSelected ] = useState(entry.length)

	useEffect(()=> {
		setEntryIsSelected(entry.length)
	}, [entryObj, entry.length]);

	// useEffect(()=> {

	// })

	const smallMainView = (entryIsSelected,newEntrySelected) => {
		if (entryIsSelected){
			return (
				// <p>Edit Entry</p>
				<FormEntryRUD />
			)
		} else if (newEntrySelected){
			return (
				// <p>New Entry</p>
				<FormEntryCreate />
			)
		} else {
			return (<FormPersonRU user={user} />)
		}
	}

	return (
		<div className="horizontal-panel-R horizontal-panel" id="container-main-view">
			{smallMainView(entryIsSelected,newEntrySelected)}
		</div>
	)


}

export default SmallMainView;