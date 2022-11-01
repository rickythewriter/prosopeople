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

		- handleClick
			callback - functionality for tag clicks, as specified by 
			parent component

		- clickArgs
			array - arguments for handleClick

		- handleDelete
			callback - functionality for x clicks

		- deletionArgs
			array of arguments for handleDelete


/---------------------------------------------------------------------*/

import React from 'react';
import './TagSlip.css';

const TagSlip = ({tag, clickable, selected, handleClick, clickArgs, handleDelete, deletionArgs}) => {

	return(
		<div className={(selected) ? "selected-tag-slip" : ""}>
		<div 
			className={'tag-slip'}
		>
			<div 
				className='name-tag-slip'
				onClick={()=>{
					if (clickable) {
						handleClick(...clickArgs)	
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