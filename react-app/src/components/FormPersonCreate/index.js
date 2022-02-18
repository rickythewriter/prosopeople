import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './FormPersonCreate.css'
import { createPerson, loadPeople } from '../../store/people'

const FormPersonCreate = ({user}) => {
	const [name, setName] = useState("")
	const [errors, setErrors] = useState([])

	const dispatch = useDispatch()

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
        }
        else {
        	/* Create new Person */
            const payload = {
                name: name,
                description: null,
                user_id: user.id
            }
            // console.log(payload)
            const newPerson = await dispatch(createPerson(payload, user))
            	.catch(async(res)=> {
                	const data = await res.json()
                	if (data && data.errors) setErrors(data.errors)
            	}
            )
            dispatch(loadPeople(user));
            setName('');
            setErrors([])
        // }
	    }
    }

	return (
		<div id="person-form-create">
			<form onSubmit={handleSubmit}>
				<label className="panel-heading">Who Would You Like to Write About?</label>
				<div>
			        <input 
			          type="text"
			          value={name || ""}
			          onChange={(e) => setName(e.target.value)}
			        />
			    </div>
			    {errors.map((error, idx) => <div className="error-message" id="new-name-error" key={idx}>{error}</div>)}
			    <button type="submit" id="button-add-person">Create Dossier</button>
			</form>
		</div>
	)
}

export default FormPersonCreate;