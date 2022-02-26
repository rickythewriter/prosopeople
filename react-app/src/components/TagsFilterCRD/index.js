import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserTags, deleteTag } from '../../store/tags'
import TagSlip from '../TagSlip';
import './TagsFilterCRD.css'

const TagsFilterCRD = () => {
	const user = useSelector(state => state.session.user)
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj.user);
	const dispatch = useDispatch();

	/* Load all of a user's tags, when no person is selected */
	useEffect(() => {
		const personSelected = Object.values(person).length;
		if (!personSelected) {dispatch(loadUserTags(user));}
	}, [dispatch, person, user])

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
			>
				Select the Relevant Tags
			</h4>

			<div className='tags-stack user-tags'>
			 	{tags.map( tag => {
			 		return (
			 			<TagSlip 
			 				tag={tag} 
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