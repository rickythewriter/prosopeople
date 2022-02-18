/*---------------------------------------------------------------------/
	
	Layout

	<title />
	<last updated /> //need to format this
	<body preview />

	Reference Code Snippets:

		const adjustTimeZone = (dateString) => {
			const date = new Date(`${dateString} UTC`);
			return date.toString();
		}

		const dateStringUTC = adjustTimeZone(dateString);
		const dateWordArray = dateStringUTC.split(' ');
		const dayOfWeekShort = dateWordArray[0]
		const monthShort = dateWordArray[1]
		const dayOfMonthWithZero = dateWordArray[2]
		const yearFull = dateWordArray[3]
		const time = dateWordArray[4]

/---------------------------------------------------------------------*/

import React from 'react';
import { useDispatch } from 'react-redux';
import { loadEntry } from '../../store/entry'
import './EntryPreviewCard.css'



const EntryPreviewCard = ({entry}) => {
	const dispatch = useDispatch()

	

	const convertToTwelveHour = (timeStringMilitary) => {
		const timeUnits = timeStringMilitary.split(':')
		const hour = timeUnits[0];
		const minutes = timeUnits[1];
		const hourInt = parseInt(hour);
		if ( hourInt > 12) {
			return `${hourInt-12}:${minutes} pm`;
		} else {
			return `${hour}:${minutes} am`;
		}
	}

	const formatTime = (dateString) => {

		/* Adjust Time Zone */

		/* 
			Change from 
				short day of week + short month + two-digit day + full year
			to
				short day of week, short month two-digit day, full year at time
		*/
		const dateWordArray = dateString.split(' ');
		const dayOfWeekShort = dateWordArray[0]
		const monthShort = dateWordArray[2]
		const dayOfMonthWithZero = dateWordArray[1]
		const yearFull = dateWordArray[3]
		const time = dateWordArray[4]
		
		const timeTwelveHour = convertToTwelveHour(time);

		const formattedTime = `${dayOfWeekShort} ${monthShort} ${dayOfMonthWithZero}, ${yearFull} at ${timeTwelveHour}`
		return formattedTime
	}

	// console.log("This is a loaded entry: ", entry)
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
					{/*{entry.updated_at}<br/>*/}
					{/*{adjustTimeZone(entry.updated_at)}<br/>*/}
					{formatTime(entry.updated_at)}<br/>
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