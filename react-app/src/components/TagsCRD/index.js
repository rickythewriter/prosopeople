import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPersonTags } from '../../store/tags'
import TagSlip from '../TagSlip';
import './TagsCRD.css'

const TagsCRD = () => {
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj);
	const dispatch = useDispatch()

	/* Load a person's tags, when and only if a person is selected */
	useEffect(() => {
		const personSelected = Object.values(person).length;
		if (personSelected) {dispatch(loadPersonTags(person));}
	}, [dispatch, person])
	
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

			<div className='tags-stack person-tags'>
				{tags.map( tag => {
					return (
						<TagSlip tag={tag} key={tag.id} />
					)
				})}
			</div>
		</div>
	)
}

export default TagsCRD;