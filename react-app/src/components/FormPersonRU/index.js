import React, {useState, useEffect} from 'react';

const FormPersonRU = (selectedPerson) => {
	
	console.log("selectedPerson after passing into FormPersonRU: ", selectedPerson);

	const [ person, setPerson ] = useState(selectedPerson.selectedPerson);
	const [ name, setName] = useState()
	const [ description, setDescription ] = useState()

	useEffect(() => {
		setPerson(selectedPerson.selectedPerson);
    }, [selectedPerson])

	useEffect(() => {
	    setName(person.name);
		setDescription(person.description || "");
	}, [person])


	return (
		<div id="person-form-read-edit">

			<form>

				<label>{name}</label>
		        <br />
		        <input 
		          type="text"
		          value={name || ""}
		          onChange={(e) => setName(e.target.value)}
		        />
		        <br />

				<label>Description</label>
		        <br />
		        <textarea
		          value={description || ""}
		          onChange={(e) => setDescription(e.target.value)}
		        />
		        <br />

			</form>

		</div>
	)
};

export default FormPersonRU;