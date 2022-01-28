import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePerson, deletePerson, loadPeople } from '../../store/people'
import { loadPerson, removePerson } from '../../store/person'
import MainView from '../MainView'
import './FormPersonRU.css'

const FormPersonRU = (user) => {

	const person = useSelector(state=>state.person);
	const [ name, setName] = useState()
	const [ description, setDescription ] = useState()
	const [errors, setErrors] = useState([])

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
            setErrors([]);
            dispatch(loadPerson(person));
	    }
    }

    const handleDelete = async e => {
    	e.preventDefault();
        setErrors([]);
        await dispatch(deletePerson(person));
        dispatch(removePerson());
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
				    <button className="formpersonru-buttons" type="submit" id="button-update">Revise</button>
				    <button className="formpersonru-buttons" id="button-delete" onClick={handleDelete}>Discard Dossier</button>
			    </div>

			</form>


		</div>
	)
};

export default FormPersonRU;