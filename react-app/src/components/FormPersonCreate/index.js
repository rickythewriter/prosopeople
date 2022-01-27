import React, {useState} from 'react';
import './FormPersonCreate.css'

const FormPersonCreate = () => {
	const [name, setName] = useState()

	return (
		<div id="person-form-create">
			<form>
				<label>Add a Person</label>
				<div>
			        <input 
			          type="text"
			          value={name || ""}
			          onChange={(e) => setName(e.target.value)}
			        />
			    </div>
			</form>
		</div>
	)
}

export default FormPersonCreate;