import React from 'react';

const FormPersonRU = (selectedPerson) => {
	
	console.log("selectedPerson after passing into FormPersonRU: ", selectedPerson);

	const person = selectedPerson.selectedPerson;

	return (
		<>
			<p>You have selected {person.name}</p>
			<p>{person.description}</p>
		</>
	)
};

export default FormPersonRU;