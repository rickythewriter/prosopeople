import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntries } from '../../../../store/entries'
import { removeEntry } from '../../../../store/entry'
import EntryPreviewCard from './EntryPreviewCard';
import './EntriesMenu.css'


const EntriesMenu = ({setNewEntrySelected, setShowTags}) => {
	const entriesObj = useSelector(state => state.entries)
	const person = useSelector(state => state.person)
	const entries = Object.values(entriesObj);
	const dispatch = useDispatch();

	/* Load entries only if state contains a selected person */
	useEffect(()=> {
		const personSelected = Object.values(person).length;
		if (personSelected) {dispatch(loadEntries(person));}
	}, [dispatch, person])

	/* Sort entries array by date */
	entries.sort(function(a,b) {
		const timeA = new Date(a.updated_at) 
		const timeB = new Date(b.updated_at)
		if (timeA < timeB) {
			return 1;
		}
		if (timeA > timeB) {
			return -1
		}
		return 0
	});

	/* This component iterates each entry into an EntryPreviewCard */
	return (
		<div id="container-entries">
			<div id="right-menu-head">
				<select
					id="panel-heading"
					onChange={e => {
						switch (e.target.value) {
							case "tags":
								setShowTags(true);
								break;
							case "entries":
								setShowTags(false);

							default:
								break;
						}
					}}
				>
					<option value="entries">Entries</option>
					<option value="tags">Tags</option>
				</select>
				<div 
					id="add-new"
					onClick={() => {
						dispatch(removeEntry());
						setNewEntrySelected(true);
					}}	
				>
					+
				</div>
			</div>

			<div id='entries-window'>
				{entries.map( entry => {
					return (
						<EntryPreviewCard entry={entry} key={entry.id}/>
					)
				})}
			</div>
		</div>
	)
}

export default EntriesMenu;