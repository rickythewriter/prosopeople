/*---------------------------------------------------------------------/

Query and display dossiers (named after the people for whom they were
made.

/---------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPeople } from '../../store/people'
import { loadPerson, removePerson } from '../../store/person'
import { loadEntries } from '../../store/entries'
import { removeEntry } from '../../store/entry'
import { loadUserTags, loadPersonTags, removeDossierTags, clearFilterTags } from '../../store/tags'
import './NavPanel.css'

const NavPanel = ({setNewEntrySelected} ) => {
	const user = useSelector(state => state.session.user);
	const peopleObj = useSelector(state => state.people)
	const people = Object.values(peopleObj)
	// const [peopleDisplayed, setPeopleDisplayed] = useState([...people])
	const selectedPerson = useSelector(state => state.person);
	const entry = useSelector(state => state.entry);
	const dispatch = useDispatch();
	
	useEffect(() => {
        dispatch(loadPeople(user))
    }, [dispatch, user])

	/* 
		Filter people according to tags selected 
			peopleFiltered
			for each tag in tagsFiltered,
				query a list of people with that tag.
				compare peopleFiltered with that list


	*/
	const filterPeople = (peopleDisplayed) => {
		// return [people[1]];
		return [...people]
	}


	/* Update dossiers-displayed when there are filter tags */
  //   useEffect(() => {
		// if (tagsFilter.length > 0) setPeopleDisplayed(filterPeople(tagsFilter, peopleDisplayed));
		// else setPeopleDisplayed([...people])
  //   }, [tagsFilter])

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
			<h4 
				className="panel-heading"
				onClick={()=> {
					dispatch(removePerson());
					dispatch(removeDossierTags());
					dispatch(clearFilterTags());
				}	
			}>
				Dossiers
			</h4>


			<ul id="list-people">
				{people.map( person => {
					return (
						<div className="dossier-name" key={person.id}>
							<div className={(person.id === selectedPerson.id) ? "selected-person" : ""}>
								<li 
									key={person.id} 
									onClick={()=> {
										setNewEntrySelected(false);
										dispatch(loadPeople(user));	//refill form fields after alterations
										dispatch(loadPerson(person));
										dispatch(removeEntry(entry));
										dispatch(clearFilterTags());
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