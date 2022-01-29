/*---------------------------------------------------------------------/
	Layout

	<title />
	<last updated /> //need to format this
	<body preview />

	

/---------------------------------------------------------------------*/

import React from 'react';
import './EntryPreviewCard.css'



const EntryPreviewCard = ({entry}) => {
	return(
		<div className='card-entry-preview'>
			<h4>
				{entry.title}
			</h4>
			<div id='preview-date'>
				<p>
					{entry.updated_at}
				</p>
			</div>
			<div id='preview-text'>
				<p>
					{entry.body}
				</p>
			</div>

		</div>
	)
	
}

export default EntryPreviewCard;