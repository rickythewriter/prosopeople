/*---------------------------------------------------------------------/

	Decides which menu to open depending on the item that was selected.

/---------------------------------------------------------------------*/


import React from 'react'
// import { useDispatch } from 'react-redux';

const MainView = ({selectedItemType, selectedItemId, peopleObj}) => {

	/* Choose view component based on the item type I receive*/
	switch(selectedItemType){
		case 'person':
			const selectedPerson = peopleObj[selectedItemId];
			return (
				<>
					{/*<p>You have selected {selectedPerson.name}</p>
					<p>{selectedPerson.description}</p>*/}
				</>
			)
			break;
		// case 'entry':
		// 	return (
		// 		<p>Entry form here</p>
		// 	)
		// 	break;
		// case 'group':
		// 	return (
		// 		<p>Group information form here</p>
		// 	)
		// 	break;
		default:
			return (
				<p>Fear me, for I am THE MAIN VIEW</p>	
			)
	}


	
}

export default MainView