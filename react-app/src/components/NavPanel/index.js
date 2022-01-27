/*---------------------------------------------------------------------/

Query and display dossiers (named after the people for whom they were
made.

/---------------------------------------------------------------------*/

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPeople } from '../../store/people'
import './NavPanel.css'

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
			<h4 
				className="panel-heading"
				onClick={()=> {
					setSelectedItemType("people")
					setSelectedItemId(null)
				}
			}>
				People
			</h4>
			<ul id="list-people">
				{people.map( person => {
					return (
						<div className="dossier-name">
							<li 
								key={person.id} 
								onClick={()=> {
									setSelectedItemType("person");
									setSelectedItemId(person.id);
								}}
							>
								{person.name}
							</li>
						</div>
					)
				})}
			</ul>
		</nav>

	)
}

export default NavPanel;