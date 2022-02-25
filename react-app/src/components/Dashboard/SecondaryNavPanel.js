/*---------------------------------------------------------------------/

	The main responsibility of SecondaryNavPanel is:
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
import EntriesMenu from '../EntriesMenu';
import TagsCRD from '../TagsCRD';
import TagsFilterCRD from '../TagsFilterCRD';

const SecondaryNavPanel = ({personIsSelected, setNewEntrySelected, showTags}) => {

	const secondaryNavPanel = () => {

		if (showTags && personIsSelected) {
			return (<TagsCRD />)
		} else if (personIsSelected) {
			return (
				<EntriesMenu 
					setNewEntrySelected={setNewEntrySelected} 
				/>
			)
		} else {
			return (
				<TagsFilterCRD />
			)
		}	
	}
	

	return secondaryNavPanel()
}

export default SecondaryNavPanel;