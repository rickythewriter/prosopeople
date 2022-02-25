import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserTags } from '../../store/tags'
import TagSlip from '../TagSlip';
import './TagsFilterCRD.css'

const TagsFilterCRD = () => {
	const user = useSelector(state => state.session.user)
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj);
	const dispatch = useDispatch();

	/* Load all of a user's tags, when no person is selected */
	useEffect(() => {
		const personSelected = Object.values(person).length;
		if (!personSelected) {dispatch(loadUserTags(user));}
	}, [dispatch, person, user])
	
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
						<TagSlip tag={tag} key={tag.id}/>
					)
				})}
			</div>
		</div>
	)
}

export default TagsFilterCRD;