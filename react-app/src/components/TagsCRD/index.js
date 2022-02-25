import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TagSlip from '../TagSlip';
import './TagsCRD.css'

const TagsCRD = () => {
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj);
	
	const dispatch = useDispatch()
	
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

			<div id='tags-stack'>
				{tags.map( tag => {
					return (
						<TagSlip tag={tag} />
					)
				})}
			</div>
		</div>
	)
}

export default TagsCRD;