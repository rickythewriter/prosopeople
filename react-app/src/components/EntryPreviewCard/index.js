/*---------------------------------------------------------------------/
	Layout

	<title />
	<last updated /> //need to format this
	<body preview />

	

/---------------------------------------------------------------------*/

import React from 'react';
import { useDispatch } from 'react-redux';
import { loadEntry } from '../../store/entry'
import './EntryPreviewCard.css'



const EntryPreviewCard = ({entry}) => {
	const dispatch = useDispatch()

	console.log("This is a loaded entry: ", entry)
	return(
		<div 
			className='card-entry-preview'
			onClick={() => {dispatch(loadEntry(entry))}}
		>
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