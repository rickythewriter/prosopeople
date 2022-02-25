/*---------------------------------------------------------------------/
	
	Layout

	[tag    x]

/---------------------------------------------------------------------*/

import React from 'react';
import './TagSlip.css'

const TagSlip = ({tag}) => {
	return(
		<div 
			className='tag-slip'
			// onClick={() => {dispatch(loadEntry(entry))}}
		>
			<p>
				{tag.name}
			</p>
			<div
				className='right-half-tag-slip'
			>
				<div>
				</div>
				<div className='x-tag-slip'>
					<p>x</p>
				</div>
			</div>
		</div>
	)
}

export default TagSlip;