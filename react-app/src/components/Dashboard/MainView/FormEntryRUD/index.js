import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEntry, deleteEntry } from '../../../../store/entries'
import { loadEntry, removeEntry } from '../../../../store/entry'
import './FormEntryRUD.css'

const FormEntryRUD = () => {

	const entry = useSelector(state=>state.entry);
	const [ title, setTitle] = useState("")
	const [ body, setBody ] = useState("")
	const [errors, setErrors] = useState([])
	const [successfullyUpdated, setSuccessfullyUpdated] = useState(false)

	const dispatch = useDispatch()

	useEffect(() => {
		/* Clear errors when clicking away */
		if (entry) {
			setTitle(entry.title || "");
			setBody(entry.body || "");
		}
		setErrors([]);
	}, [entry])

	const handleSubmit = async e => {
		e.preventDefault();

		if (title.length === 0 && body.length === 0) {
			/* Error Handler (front end): Entry must have title or body*/
			setErrors(["Please enter a title or a body for your entry."])
			return
		} else if (title.length > 100) {
			/* Error Handler (front end): Entry title must not exceed 100 characters */
        	setErrors(["Entry title must be 100 characters or fewer"])
        	return
        } else {
        	/* Update Entry */
            const payload = {
            	id: entry.id,
            	title: title,
                body: body,
            }
            const newEntry = await dispatch(updateEntry(payload))
            	.catch(async(res)=> {
                	const data = await res.json();
                	if (data && data.errors) setErrors(data.errors)
            	}
            )
            setErrors([]);
            dispatch(loadEntry(entry));

			/* Show update-success message */
			setSuccessfullyUpdated(true);
			const timeout = setTimeout(function () {
				setSuccessfullyUpdated(false);
			}, 1200);
			return () => clearTimeout(timeout);
	    }
    }

    /* Delete entry; clear from state */
    const handleDelete = async e => {
    	e.preventDefault();
        setErrors([]);
        await dispatch(deleteEntry(entry));
        dispatch(removeEntry());
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
					{ successfullyUpdated ?
						<button className="formentryrud-buttons successfully-updated" type="button" id="button-update-entry">Revised</button> :
						<button className="formentryrud-buttons" type="submit" id="button-update-entry">Revise</button>
					}
				    <button className="formentryrud-buttons" id="button-delete-entry" onClick={handleDelete}>Discard Entry</button>
			    </div>

			</form>


		</div>
	)
};

export default FormEntryRUD;