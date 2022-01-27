/*---------------------------------------------------------------------/

Query and display dossiers (named after the people for whom they were
made.

/---------------------------------------------------------------------*/

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPeople } from '../../store/people'

const NavPanel = ({user, people, setSelectedItemType, setSelectedItemId }) => {
	// const user = useSelector(state => state.session.user);
	// const peopleObj = useSelector(state => state.people)
	// const people = Object.values(peopleObj)
	const dispatch = useDispatch()
	
	useEffect(() => {
        dispatch(loadPeople(user))
    }, [dispatch, user])

	return (
		<nav id='nav-panel'>
			<h4>People</h4>
			<ul>
				{people.map( person => {
					return (
						<li 
							key={person.id} 
							onClick={()=> {
								setSelectedItemType("person");
								setSelectedItemId(person.id);
							}}
						>
							{person.name}
						</li>
					)
				})}
			</ul>
		</nav>

	)
}

export default NavPanel;