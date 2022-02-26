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

/---------------------------------------------------------------------*/

import React from 'react';
import './TagSlip.css';

const TagSlip = ({tag, handleDelete, deletionArgs}) => {

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
					handleDelete(...deletionArgs)
				}}
			>
				<p>x</p>
			</div>
		</div>
	)
}

export default TagSlip;