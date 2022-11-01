/* after adding entry, turn it into edit page for entry */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEntry } from '../../../../store/entries'
import { loadEntry } from '../../../../store/entry'
import './FormEntryCreate.css'

const FormEntryCreate = () => {

	const user = useSelector(state=>state.session.user);
	const person = useSelector(state=>state.person);
	const [ title, setTitle] = useState("")
	const [ body, setBody ] = useState("")
	const [errors, setErrors] = useState([])

	const dispatch = useDispatch()

	const handleSubmit = async e => {
		e.preventDefault();

		if (title.length === 0 && body.length === 0) {
			/* Error Handler (front end): There must be a title or body */
			setErrors(["Please enter a title or a body for your entry."])
			return
		} else if (title.length > 100) {
			/* Error Handler (front end): Entry title must not exceed 100 characters */
        	setErrors(["Entry title must be 100 characters or fewer"])
        	return
        } else {
        	/* Create new Entry */
            const payload = {
            	title: title,
                body: body,
                user_id: user.id,
                person_id: person.id,
            }
            // console.log(payload)
            const newEntry = await dispatch(createEntry(payload, user, person))
            	// .catch(async(res)=> {
                	// const data = await res.json();
                	// if (data && data.errors) setErrors(data.errors)
            	// })
            setErrors([]);
            dispatch(loadEntry(newEntry));
	    }
    }

	return (
		<div id="entry-form-r-u-d">

			<form onSubmit={handleSubmit}>

				<label id="label-title">{title}</label>
				<div className="entry-form-r-u-d" id="input-title">
			        <input 
			          type="text"
			          value={title || ""}
			          placeholder="Title your entry."
			          onChange={(e) => setTitle(e.target.value)}
			        />
			    </div>
		        <br />

				<label id="label-body">Body</label>
		        <br />
		        <div id="input-body">
			        <textarea
			          value={body || ""}
			          placeholder="Draft your entry."
			          onChange={(e) => setBody(e.target.value)}
			        />
			    </div>
		        <br />
		        {errors.map((error, idx) => <div className="error-message" id="new-name-error" key={idx}>{error}</div>)}

		        <div id="container-formentryrud-buttons">
				    <button className="formentryrud-buttons" type="submit" id="button-update-entry">Save</button>
			    </div>

			</form>


		</div>
	)
};

export default FormEntryCreate;