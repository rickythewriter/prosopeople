/*---------------------------------------------------------------------/

Query and display dossiers (named after the people for whom they were
made.

/---------------------------------------------------------------------*/

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPeople } from '../../store/people'
import { loadPerson, removePerson } from '../../store/person'
import { loadEntries } from '../../store/entries'
import { removeEntry } from '../../store/entry'
import './NavPanel.css'

const NavPanel = ({user, people, setNewEntrySelected} ) => {
	// const user = useSelector(state => state.session.user);
	// const peopleObj = useSelector(state => state.people)
	// const people = Object.values(peopleObj)
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
		<nav id='nav-panel'>
			{/*<div className={(selectedItemType === "people") ? "selected-people" : ""}>*/}
				<h4 
					className="panel-heading"
					onClick={()=> {
						dispatch(removePerson());
					}	
				}>
					Dossiers
				</h4>
			{/* </div> */}


			<ul id="list-people">
				{people.map( person => {
					return (
						<div className="dossier-name">
							<div className={(person.id === selectedPerson.id) ? "selected-person" : ""}>
								<li 
									key={person.id} 
									onClick={()=> {
										dispatch(loadPeople(user));	//refill form fields after alterations
										dispatch(loadPerson(person));
										dispatch(loadEntries(person));
										setNewEntrySelected(false);
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
		</nav>

	)
}

export default NavPanel;