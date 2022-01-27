import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './FormPersonCreate.css'
import { createPerson, loadPeople } from '../../store/people'

const FormPersonCreate = ({user}) => {
	const [name, setName] = useState("")
	const [description, setDescription] = useState()
	const [errors, setErrors] = useState([])

	const dispatch = useDispatch()

	const handleSubmit = async e => {
		e.preventDefault();

		if (name.length === 0) {
            setErrors(["Please enter a name."])
            return
        } else if (name.length > 100) {
        	setErrors(["A name must be 100 characters or fewer"])
        	return
        }
        else {
            const payload = {
                name: name,
                description: null,
                user_id: user.id
            }
            console.log(payload)
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
				<label className="panel-heading">Add a Person</label>
				<div>
			        <input 
			          type="text"
			          value={name || ""}
			          onChange={(e) => setName(e.target.value)}
			        />
			    </div>
			    {errors.map((error, idx) => <div className="error-message" id="new-name-error" key={idx}>{error}</div>)}
			    <button type="submit" id="button-add-person">Confirm</button>
			</form>
		</div>
	)
}

export default FormPersonCreate;