/*---------------------------------------------------------------------/

	If there is no entry selected, show person edit view.
	If there is an entry selected, show entry edit view.

/---------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormPersonRU from '../FormPersonRU'

const SmallMainView = () => {
	const user = useSelector(state => state.session.user);
	const entryObj = useSelector(state => state.entry);
	const entry = Object.values(entryObj);
	const [ entryIsSelected, setEntryIsSelected ] = useState(false)

	useEffect(()=> {
		setEntryIsSelected(entry.length)
	}, [entryObj]);

	// if (entryIsSelected) {
	// 	return (
	// 		// <FormEntryRUD />
	// 	)
	// } else {
	// 	return (
	// 		<FormPersonRU user={user}/>
	// 	)
	// }

	return (
		<div className="horizontal-panel-R horizontal-panel" id="container-main-view">
			{entryIsSelected ? (<p>Edit Entry</p>) : (<FormPersonRU user={user} />)}
		</div>
	)


}

export default SmallMainView;