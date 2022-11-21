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

import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPeople, loadPeopleMultipleTags } from '../../../../store/people'
import { loadPersonTags, dissociateTag, addFilterTag, removeFilterTag } from '../../../../store/tags'
import TagSearchCR from '../TagSearchCR';
import TagSlip from '../TagSlip';
import './TagsCRD.css'

const TagsCRD = ({setShowTags}) => {
	const user = useSelector(state => state.session.user)
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj.person);
	const tagsFilter = Object.values(tagsObj.filter)
	const dispatch = useDispatch()

	/* Load a person's tags, but only when a person is selected */
	useEffect(() => {
		const personSelected = Object.values(person).length;
		if (personSelected) {dispatch(loadPersonTags(person));}
	}, [dispatch, person])

	/* Handle tag clicks - add/remove from filter */
	const handleClick = (tag, tagSelected, tagsFilter) => {
		if (tagSelected) {
			dispatch(removeFilterTag(tag))
		} else if (!tagSelected) {
			dispatch(addFilterTag(tag))
		}
	}

	/* Load tagged people every time the filter tags change */
	useEffect(()=> {
		if (tagsFilter.length === 0) {
			dispatch(loadPeople(user))
		} else {
			dispatch(loadPeopleMultipleTags(tagsFilter))
		}
	}, [dispatch, tagsObj, user])

	/* 
		Handle deletion of tag
			Dissociate tag from dossier; clear from state. 
	*/
	const handleDelete = (person, tag, tagSelected) => {
		if (tagSelected){
			dispatch(removeFilterTag(tag))
		} else {dispatch(dissociateTag(person, tag));}
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
			id="container-tags-person"
		>
			<select
				id="panel-heading"
				onChange={e => {
					switch (e.target.value) {
						case "tags":
							setShowTags(true);
							break;
						case "entries":
							setShowTags(false);

						default:
							break;
					}
				}}
			>
				<option value="tags">Tags</option>
				<option value="entries">Entries</option>
			</select>

			<TagSearchCR />

			<div className='tags-stack person-tags'>
				{tags.map( tag => {

					let isSelected = false

					if(tagsObj.filter[tag.id]) {
						isSelected = true	
					}

					return (
						<TagSlip 
							tag={tag} 
							clickable={true}
							selected={isSelected}
							handleClick={handleClick}
							clickArgs={[tag, isSelected, tagsFilter]}
							handleDelete={handleDelete}
							deletionArgs={[person,tag, isSelected]}
							key={tag.id}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default TagsCRD;