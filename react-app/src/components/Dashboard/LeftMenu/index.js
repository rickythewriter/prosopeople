/*---------------------------------------------------------------------/

Query and display dossiers (named after the people for whom they were
made.

/---------------------------------------------------------------------*/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPeople } from '../../../store/people'
import { loadPerson, removePerson } from '../../../store/person'
import { removeEntry } from '../../../store/entry'
import { removeDossierTags } from '../../../store/tags'
import './LeftMenu.css'

const LeftMenu = ({setNewEntrySelected} ) => {
	const user = useSelector(state => state.session.user);
	const peopleObj = useSelector(state => state.people)
	const people = Object.values(peopleObj)
	const selectedPerson = useSelector(state => state.person);
	const entry = useSelector(state => state.entry);
	const dispatch = useDispatch();
	
	useEffect(() => {
        dispatch(loadPeople(user))
    }, [dispatch, user])

	/* Sort people array by alphabetical order */
	people.sort(function(a,b) {
		const nameA = a.name.toLowerCase() 
		const nameB = b.name.toLowerCase()
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1
		}
		return 0
	});

	return (
		<>
			<div id="left-menu-head">
				<h4
					className="panel-heading"
					onClick={() => {
						dispatch(removePerson());
						dispatch(removeDossierTags());
					}}
				>
					Dossiers
				</h4>
				<div 
					id="add-new"
					onClick={() => {
						dispatch(removePerson());
						dispatch(removeDossierTags());
					}}
				>
					+
				</div>
			</div> 

			<ul id="list-people">
				{people.map( person => {
					return (
						<div className="dossier-name" key={person.id}>
							<div className={(person.id === selectedPerson.id) ? "selected-person" : ""}>
								<li 
									key={person.id} 
									onClick={()=> {
										setNewEntrySelected(false);
										// dispatch(loadPeople(user));	//refill form fields after alterations
										dispatch(loadPerson(person));
										dispatch(removeEntry(entry));
									}}
								>
									{person.name}
								</li>
							</div>
						</div>
					)
				})}
			</ul>
		</>

	)
}

export default LeftMenu;