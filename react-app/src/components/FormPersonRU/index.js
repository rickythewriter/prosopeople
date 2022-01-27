import React, {useState, useEffect} from 'react';
import './FormPersonRU.css'

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

				<label id="label-name">{name}</label>
				<div className="person-form-read-update-input" id="input-name">
			        <input 
			          type="text"
			          value={name || ""}
			          onChange={(e) => setName(e.target.value)}
			        />
			    </div>
		        <br />

				<label id="label-description">Description</label>
		        <br />
		        <div id="input-description">
			        <textarea
			          value={description || ""}
			          onChange={(e) => setDescription(e.target.value)}
			        />
			    </div>
		        <br />

			</form>

		</div>
	)
};

export default FormPersonRU;