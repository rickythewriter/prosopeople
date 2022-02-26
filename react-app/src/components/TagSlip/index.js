/*---------------------------------------------------------------------/
	
	Layout

		[tag    x]


	Props:

		- tag 
			tag object with name and id

		- handleDelete
			callback function for x clicks

		- deletionArgs
			array of arguments for handleDelete


	Code Snippets for Reference:

		<div className={(person.id === selectedPerson.id) ? "selected-person" : ""}>
		</div>



/---------------------------------------------------------------------*/

import React, { useState } from 'react';
import './TagSlip.css';

const TagSlip = ({tag, tagsSelected, setTagsSelected, handleDelete, deletionArgs}) => {
	const [tagSelected, setTagSelected] = useState(false)

	return(
		<div className={(tagSelected) ? "selected-tag-slip" : ""}>
		<div 
			className='tag-slip'
		>
			<div 
				className='name-tag-slip'
				onClick={()=>{
					if (tagSelected) {
						/* 
							If tag is selected, 
								remove it from array, and
								setTagSelected(false) 
						*/
						const i = tagsSelected.indexOf(tag)
						tagsSelected.splice(i,1)
						setTagsSelected([...tagsSelected]);
						setTagSelected(false)
					} else if (!tagSelected) {
						/* 
							If tag is not selected, 
								add it to array, and
								setTagSelected(true) 
						*/
						setTagsSelected([...tagsSelected, tag])
						setTagSelected(true)
					}
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