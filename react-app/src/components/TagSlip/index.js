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
			<div className='name-tag-slip'>
				<p>
					{tag.name}
				</p>
			</div>
			<div>
			</div>
			<div className='x-tag-slip'>
				<p>x</p>
			</div>
		</div>
	)
}

export default TagSlip;