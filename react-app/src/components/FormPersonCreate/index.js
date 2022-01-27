import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './FormPersonCreate.css'
import { createPerson, loadPeople } from '../../store/people'

const FormPersonCreate = ({user}) => {
	const [name, setName] = useState()
	const [description, setDescription] = useState()

	const dispatch = useDispatch()

	const handleSubmit = async e => {
		e.preventDefault();

		// if (errors.length > 0) return
        // else if (taskName.length === 0) {
            // setErrors(["Name is required."])
            // return
        // }
        // else {
        	const userIdString = `${user.id}`
            const payload = {
                name: name,
                description: null,
                user_id: userIdString
            }
            console.log(payload)
            const newPerson = await dispatch(createPerson(payload, user))
            	// .catch(async(res)=> {
                	// const data = await res.json()
                // if (data && data.errors) setErrors(data.errors)
	            // }
	        // )
            dispatch(loadPeople(user));
            console.log("I have loaded the user's people")
            setName('');
        // }
    }

	return (
		<div id="person-form-create">
			<form onSubmit={handleSubmit}>
				<label>Add a Person</label>
				<div>
			        <input 
			          type="text"
			          value={name || ""}
			          onChange={(e) => setName(e.target.value)}
			        />
			    </div>
			    <button type="submit">Confirm</button>
			</form>
		</div>
	)
}

export default FormPersonCreate;