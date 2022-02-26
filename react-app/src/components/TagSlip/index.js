/*---------------------------------------------------------------------/
	
	Layout

		[tag    x]


	Props:

		- tag 
			object - tag with name and id

		- clickable
			boolean - determines whether a click affects the tag slip

		- selected
			boolean - determines whether tag is styled as a 
			'selected-tag-slip' class
			'selected-tag-slip' styling handled by parent element

		- setTagsFilter
			state hook - handles filter tags for parent element.

		- handleClick
			callback - functionality for tag clicks, as specified by 
			parent component

		- clickArgs
			array - arguments for handleClick

		- handleDelete
			callback - functionality for x clicks

		- deletionArgs
			array of arguments for handleDelete


	Code Snippets for Reference:

		<div className={(person.id === selectedPerson.id) ? "selected-person" : ""}>
		</div>



/---------------------------------------------------------------------*/

import React, { useState } from 'react';
import './TagSlip.css';

const TagSlip = ({tag, clickable, selected, setTagsFilter, handleClick, clickArgs, handleDelete, deletionArgs}) => {
	// const [tagSelected, setTagSelected] = useState(false)

	return(
		<div className={(selected) ? "selected-tag-slip" : ""}>
		<div 
			className={'tag-slip'}
		>
			<div 
				className='name-tag-slip'
				onClick={()=>{
					if (clickable) {
						// handleClick(tag, selected)
						handleClick(...clickArgs)	
					}
					
					// if (tagSelected) {
					// 	/* 
					// 		If tag is selected, 
					// 			remove it from array, and
					// 			setTagSelected(false) 
					// 	*/
					// 	const i = tagsSelected.indexOf(tag)
					// 	tagsSelected.splice(i,1)
					// 	setTagsSelected([...tagsSelected]);
					// 	setTagSelected(false)
					// } else if (!tagSelected) {
					// 	/* 
					// 		If tag is not selected, 
					// 			add it to array, and
					// 			setTagSelected(true) 
					// 	*/
					// 	setTagsSelected([...tagsSelected, tag])
					// 	setTagSelected(true)
					// }
				}}
			>
				<p>
					{tag.name}
				</p>
			</div>
			<div>
			</div>
			<div 
				className='x-tag-slip'
				onClick={() => {
					handleDelete(...deletionArgs)
				}}
			>
				<p>x</p>
			</div>
		</div>
		</div>
	)
}

export default TagSlip;