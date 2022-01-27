import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { updatePerson, loadPeople } from '../../store/people'
import './FormPersonRU.css'

const FormPersonRU = (selectedPerson, {user}) => {
	
	console.log("selectedPerson after passing into FormPersonRU: ", selectedPerson);

	const [ person, setPerson ] = useState(selectedPerson.selectedPerson);
	const [ name, setName] = useState()
	const [ description, setDescription ] = useState()
	const [errors, setErrors] = useState([])

	const dispatch = useDispatch()

	useEffect(() => {
		setPerson(selectedPerson.selectedPerson);
    }, [selectedPerson])

	useEffect(() => {
	    setName(person.name);
		setDescription(person.description || "");
	}, [person])

	const handleSubmit = async e => {
		e.preventDefault();

		if (name.length === 0) {
            setErrors(["Please enter a name."])
            return
        } else if (name.length > 100) {
        	setErrors(["A name must be 100 characters or fewer"])
        	return
        } else {
            const payload = {
            	id: person.id,
                name: name,
                description: description,
            }
            console.log(payload)
            const newPerson = await dispatch(updatePerson(payload, user))
            	.catch(async(res)=> {
                	const data = await res.json()
                	if (data && data.errors) setErrors(data.errors)
            	}
            )
	    }
    }

	return (
		<div id="person-form-read-edit">

			<form onSubmit={handleSubmit}>

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
			          placeholder="How would you describe this person?"
			          onChange={(e) => setDescription(e.target.value)}
			        />
			    </div>
		        <br />
		        {errors.map((error, idx) => <div className="error-message" id="new-name-error" key={idx}>{error}</div>)}
			    <button type="submit" id="button-update">Revise</button>

			</form>

		</div>
	)
};

export default FormPersonRU;