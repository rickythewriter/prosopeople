import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPerson } from '../../../../store/people'
import { associateTag } from '../../../../store/tags'
import './FormPersonCreate.css'

const FormPersonCreate = () => {
	const user = useSelector(state => state.session.user)
	const tagsObj = useSelector(state => state.tags)
	const tagsFilter = Object.values(tagsObj.filter)
	const [name, setName] = useState("")
	const [errors, setErrors] = useState([])

	const dispatch = useDispatch()

	/* Helper Function - Associate tags to new dossier */
	const handleTagAssociation = async (user, person, tag) => {
		const payload = {
			person_id: person.id,
			tag_id: tag.id,
			user_id: user.id
		}
		const newPersonTagAssoc = await dispatch(associateTag(payload, user, person, tag))
	}

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
			console.log(user);
        	/* Create new Person */
            const payload = {
                name: name,
                description: null,
                user_id: user.id
            }
            dispatch(createPerson(payload))
            	.then(async(res) => {
            		tagsFilter.forEach( async tag => {
            			const person = res
            			handleTagAssociation(user, person, tag)
            		})
            	})
            	.catch(async(res)=> {
                	const data = await res.json()
                	if (data && data.errors) setErrors(data.errors)
            	}
            )
            setName('');
            setErrors([])
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