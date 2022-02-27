import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPeople, loadTaggedPeople, loadPeopleMultipleTags } from '../../store/people'
import { loadUserTags, deleteTag, addFilterTag, removeFilterTag, clearFilterTags} from '../../store/tags'
import TagSearchCR from '../TagSearchCR';
import TagSlip from '../TagSlip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import './TagsFilterCRD.css'

const TagsFilterCRD = () => {
	const user = useSelector(state => state.session.user)
	const peopleObj = useSelector(state => state.people)
	const people = Object.values(peopleObj)
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj.user)
	const tagsFilter = Object.values(tagsObj.filter)
	const dispatch = useDispatch()

	/* Load all of a user's tags, when no person is selected */
	useEffect(() => {
		const personSelected = Object.values(person).length;
		if (!personSelected) {dispatch(loadUserTags(user));}
	}, [dispatch, person, user])

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
			dispatch(loadPeopleMultipleTags(user, tagsFilter))
		}
	}, [tagsObj])

	/* Delete tag (in a cascade); clear from state */
	const handleDelete = (tag) => {
		dispatch(deleteTag(tag));
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
			id="container-tags-user"
		>
			<div className="row-name-clear">
				<h4
					className='panel-heading'
				>
					Select the Relevant Tags
				</h4>
				<div>
					<FontAwesomeIcon 
						icon={faDeleteLeft} 
						id="clear-icon"
						onClick={()=>{dispatch(clearFilterTags())}}
					/>
				</div>
			</div>

			<div className='tags-stack user-tags'>
			 	{tags.map( tag => {

			 		return (
			 			<TagSlip 
			 				tag={tag}
			 				clickable={true}
			 				selected={tagsFilter.includes(tag)}
			 				handleClick={handleClick}
			 				clickArgs={[tag, tagsFilter.includes(tag), tagsFilter]}
			 				handleDelete={handleDelete}
			 				deletionArgs={[tag]}
			 				key={tag.id}
			 			/>
			 		)
			 	})}
			</div>
		</div>
	)
}

export default TagsFilterCRD;