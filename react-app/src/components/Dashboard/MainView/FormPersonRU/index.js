import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePerson, deletePerson } from '../../../../store/people'
import { loadPerson, removePerson } from '../../../../store/person'
import { removeEntries } from '../../../../store/entries'
import './FormPersonRU.css'

const FormPersonRU = ({user}) => {

	const person = useSelector(state=>state.person);
	const [ name, setName] = useState()
	const [ description, setDescription ] = useState()
	const [errors, setErrors] = useState([])
	const [successfullyUpdated, setSuccessfullyUpdated] = useState(false)

	const dispatch = useDispatch()

	useEffect(() => {
		/* Clear errors when clicking away */
		if (person) {
			setName(person.name);
			setDescription(person.description || "");
		}
		setErrors([]);
	}, [person])

	const handleSubmit = async e => {
		e.preventDefault();

		if (name.length === 0) {
			/* Error Handler (front end): There must be a name */
            setErrors(["Please enter a name."])
            return
        } else if (name.length > 100) {
        	/* Error Handler (front end): Name must not exceed 100 characters */
        	setErrors(["A name must be 100 characters or fewer"])
        	return
        } else {
        	/* Update Person */
            const payload = {
            	id: person.id,
                name: name,
                description: description,
            }
            const newPerson = await dispatch(updatePerson(payload, user))
            	.catch(async(res)=> {
                	const data = await res.json()
                	if (data && data.errors) setErrors(data.errors)
            	}
            )
			setErrors([]);
			dispatch(loadPerson(person));

			/* Show update-success message */
			setSuccessfullyUpdated(true);
			const timeout = setTimeout(function() {
				setSuccessfullyUpdated(false);
			}, 1200);
			return () => clearTimeout(timeout);
	    }
    }

    /* Delete Person, and associated Entries; clear Person and Entries from state */
    const handleDelete = async e => {
    	e.preventDefault();
        setErrors([]);
        await dispatch(deletePerson(person));
        dispatch(removePerson());
        dispatch(removeEntries());
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

		        <div id="container-formpersonru-buttons">
				    { successfullyUpdated ?
						<button className="formpersonru-buttons successfully-updated" type="button" id="button-update">Revised</button> :
						<button className="formpersonru-buttons" type="submit" id="button-update">Revise</button>
					}
				    <button className="formpersonru-buttons" id="button-delete" onClick={handleDelete}>Discard Dossier</button>
			    </div>

			</form>


		</div>
	)
};

export default FormPersonRU;