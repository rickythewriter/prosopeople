/*---------------------------------------------------------------------/

	The main responsibility of RightMenu is:
		Determine which view to show on middle-left quarter of 
		the dashboard.

	States:

		If there is no person selected,
			show TagsFilterCRD menu

		If there is a person selected, and 
		their Tags icon not toggled, 
			show EntriesMenu.

		If there is a person selected, and 
		their Tags icon is toggled, 
			show TagsCRD.

/---------------------------------------------------------------------*/

import React from 'react';
import EntriesMenu from './EntriesMenu';
import TagsCRD from './TagsCRD';
import TagsFilterCRD from './TagsFilterCRD';
import './RightMenu.css'

const RightMenu = ({personIsSelected, setNewEntrySelected, showTags, setShowTags}) => {

	const RightMenu = () => {

		if (showTags && personIsSelected) {
			return (
				<TagsCRD 
					setShowTags={setShowTags}	
				/>
			)
		} else if (personIsSelected) {
			return (
				<EntriesMenu 
					setNewEntrySelected={setNewEntrySelected} 
					setShowTags={setShowTags}
				/>
			)
		} else {
			return (
				<TagsFilterCRD />
			)
		}	
	}
	

	return RightMenu()
}

export default RightMenu;