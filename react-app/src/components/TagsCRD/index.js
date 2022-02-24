import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TagsCRD.css'

const TagsCRD = () => {
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj);
	
	const dispatch = useDispatch()
	
	return (
		<div 
			className="horizontal-panel-R horizontal-panel" 
			id="container-tags-person"
		>
			<h4
				className='panel-heading'
			>
				Tags
			</h4>

			<ul id="list-tags">
				{tags.map( tag => {
					return (
						<li key={tag.id}>{tag.name}</li>

						// <div className="dossier-name" key={person.id}>
						// 	<div className={(person.id === selectedPerson.id) ? "selected-person" : ""}>
						// 		<li 
						// 			key={person.id} 
						// 			onClick={()=> {
						// 				dispatch(loadPeople(user));	//refill form fields after alterations
						// 				dispatch(loadPerson(person));
						// 				dispatch(loadEntries(person));
						// 				setNewEntrySelected(false);
						// 				dispatch(removeEntry(entry));
						// 			}}
						// 		>
						// 			{person.name}
						// 		</li>
						// 	</div>
						// </div>
					)
				})}
			</ul>
		</div>
	)
}

export default TagsCRD;