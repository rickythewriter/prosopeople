import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserTags, deleteTag } from '../../store/tags'
import TagSearchCR from '../TagSearchCR';
import TagSlip from '../TagSlip';
import './TagsFilterCRD.css'

const TagsFilterCRD = ({tagsFilter, setTagsFilter}) => {
	const user = useSelector(state => state.session.user)
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj.user)
	// const [tagsFilter, setTagsFilter] = useState([])
	const dispatch = useDispatch()

	/* Load all of a user's tags, when no person is selected */
	useEffect(() => {
		const personSelected = Object.values(person).length;
		if (!personSelected) {dispatch(loadUserTags(user));}
	}, [dispatch, person, user])

	/* Print filter tags when they update */
	// useEffect(()=> {
	// 	console.log('TagsFilterCRD has read the following tags as selected: ', tagsFilter)
	// },[tagsFilter])

	/* Handle Click */
	const handleClick = (tag, tagSelected, tagsFilter) => {
		if (tagSelected) {
			/* 
				If tag is selected, 
					remove it from array, and
					setTagSelected(false) 
			*/
			const i = tagsFilter.indexOf(tag)
			tagsFilter.splice(i,1)
			setTagsFilter([...tagsFilter]);
		} else if (!tagSelected) {
			/* 
				If tag is not selected, 
					add it to array, and
					setTagSelected(true) 
			*/
			setTagsFilter([...tagsFilter, tag])
		}
	}

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
			<h4
				className='panel-heading'
				onClick={()=>{setTagsFilter([])}}
			>
				Select the Relevant Tags
			</h4>

			<TagSearchCR />

			<div className='tags-stack user-tags'>
			 	{tags.map( tag => {

			 		return (
			 			<TagSlip 
			 				tag={tag}
			 				clickable={true}
			 				selected={tagsFilter.includes(tag)}
			 				setTagsFilter={setTagsFilter}
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