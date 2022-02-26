/*---------------------------------------------------------------------/
	
	Remarkable Lessons about the  Redux Store and Re-Renders:

	From redux.js.org:
		If the value returned by the selector changes from the last 
		time it ran, useSelector will force our component to re-render 
		with the new data.

	How did that affect this code?

		When I subscribed to the state with 
			const tagsObj = useSelector(state => state.tags.person)
		my tag slips would not disappear after they were deleted.
		Note that they no longer appeared in the store.

		When I subscribed to the state with
			const tagsObj = useSelector(state => state.tags)
		the component re-rendered, just as the documentation said it
		would.

	Lesson:
		Subscribe to a first-level object in the state for automatic 
		re-renders.

/---------------------------------------------------------------------*/

import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPersonTags, dissociateTag } from '../../store/tags'
import TagSearchCR from '../TagSearchCR';
import TagSlip from '../TagSlip';
import './TagsCRD.css'

const TagsCRD = () => {
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj.person);
	const dispatch = useDispatch()

	/* Load a person's tags, but only when a person is selected */
	useEffect(() => {
		const personSelected = Object.values(person).length;
		if (personSelected) {dispatch(loadPersonTags(person));}
	}, [dispatch, person])

	/* 
		Handle deletion of tag
			Dissociate tag from dossier; clear from state. 
	*/
	const handleDelete = (person, tag) => {
		dispatch(dissociateTag(person, tag));
	}

	/* Sort tags array by alphabetical order */
	tags.sort(function(a,b) {
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
		<div 
			className="horizontal-panel-R horizontal-panel" 
			id="container-tags-person"
		>
			<h4
				className='panel-heading'
			>
				Tags
			</h4>

			<TagSearchCR />

			<div className='tags-stack person-tags'>
				{tags.map( tag => {
					return (
						<TagSlip 
							tag={tag} 
							handleDelete={handleDelete}
							deletionArgs={[person,tag]}
							key={tag.id}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default TagsCRD;