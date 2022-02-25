/*---------------------------------------------------------------------/
	
	Layout

	[tag    x]

/---------------------------------------------------------------------*/

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dissociateTag } from '../../store/tags';
import './TagSlip.css';

const TagSlip = ({tag}) => {
	const person = useSelector(state => state.person)
	const dispatch = useDispatch()

	/* Delete entry; clear from state */
	const handleDelete = () => {
		/* 
			If these are tags associated with a person,
				dissociate the tag.
		*/
		const personSelected = Object.values(person).length;
		if (personSelected) {
			dispatch(dissociateTag(person, tag));
		}
		/*
			If these are all the tags associated with the user,
				delete the tag in a cascade.
		*/
	}

	return(
		<div 
			className='tag-slip'
		>
			<div className='name-tag-slip'>
				<p>
					{tag.name}
				</p>
			</div>
			<div>
			</div>
			<div 
				className='x-tag-slip'
				onClick={() => {
					handleDelete()
				}}
			>
				<p>x</p>
			</div>
		</div>
	)
}

export default TagSlip;