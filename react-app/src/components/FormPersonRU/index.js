import React, {useState, useEffect} from 'react';

const FormPersonRU = (selectedPerson) => {
	
	console.log("selectedPerson after passing into FormPersonRU: ", selectedPerson);

	const [ person, setPerson ] = useState(selectedPerson.selectedPerson);
	const [ name, setName] = useState()
	const [ description, setDescription ] = useState()
	const [ relationship, setRelationship ] = useState()
	const [ websites, setWebsites ] = useState()
	const [ socialMedia, setSocialMedia ] = useState()
	const [ birthday, setBirthday ] = useState()
	const [ emailAddresses, setEmailAddresses ] = useState()
	const [ phoneNumbers, setPhoneNumbers ] = useState()
	const [ addresses, setAddresses ] = useState()
	const [ company, setCompany ] = useState()

	useEffect(() => {
		setPerson(selectedPerson.selectedPerson);
    }, [selectedPerson])

	useEffect(() => {
	    setName(person.name);
		setDescription(person.description || "");
		setRelationship(person.relationship || "");
		setWebsites(person.websites || "");
		setSocialMedia(person.social_media || "");
		setBirthday(person.birthday || "");
		setEmailAddresses(person.email_addresses || "");
		setPhoneNumbers(person.phone_numbers || "");
		setAddresses(person.addresses || "");
		setCompany(person.company || "");
	}, [person])

	// const person = selectedPerson.selectedPerson

	/*
	Template for array inputs

		<label>Label</label>
		        <br/>
		        {arr && arr.map(ele => {
		        	return (
	        			<>
					        <input 
					          type="text"
					          value={ele}
					        />
					        <br/>
					    </>
	        		)
		        })}
		        {!arr && (
	        			<>
					        <input 
					          type="text"
					        />
					        <br/>
					    </>
	        		)
		        }

	*/

	return (
		<div id="person-form-read-edit">
			<h4>{name}'s Information</h4>
			{/*<p>{description}</p>*/}

			<form>

				<label>Description</label>
		        <br />
		        <textarea
		          value={description || ""}
		          onChange={(e) => setDescription(e.target.value)}
		        />
		        <br />

		        <label>Relationship</label>
		        <br />
		        <input 
		          type="text"
		          value={relationship || ""}
		          onChange={(e) => setRelationship(e.target.value)}
		        />
		        <br />

		        {websites && websites.map(website => {
		        	return (
	        			<>
			        		<label>Website</label>
					        <br />
					        <input 
					          type="text"
					          value={website}
					        />
					        <br/>
					    </>
	        		)
		        })}

		        <label>Social Media</label>
		        <br/>
		        {socialMedia && socialMedia.map(socialMedium => {
		        	return (
	        			<>
					        <input 
					          type="text"
					          value={socialMedium}
					        />
					        <br/>
					    </>
	        		)
		        })}
		        {!socialMedia && (
	        			<>
					        <input 
					          type="text"
					        />
					        <br/>
					    </>
	        		)
		        }

		        <label>Birthday</label>
		        <br />
		        <input 
		          type="date"
		          value={birthday}
		        />
		        <br />

        		<label>Email</label>
		        <br/>
		        {emailAddresses && emailAddresses.map(email => {
		        	return (
	        			<>
					        <input 
					          type="email"
					          value={email}
					        />
					        <br/>
					    </>
	        		)
		        })}
		        {!emailAddresses && (
	        			<>
					        <input 
					          type="text"
					        />
					        <br/>
					    </>
	        		)
		        }

		        {/*<label>Phone</label>
		        <br/>
		        {phone_numbers.map(phone_number => {
		        	return (
	        			<>
					        <input 
					          type="text"
					          value={phone_number}
					        />
					        <br/>
					    </>
	        		)
		        })}*/}
		        <label>Phone Numbers</label>
		        <br/>
		        {phoneNumbers && phoneNumbers.map(number => {
		        	return (
	        			<>
					        <input 
					          type="text"
					          value={number}
					        />
					        <br/>
					    </>
	        		)
		        })}
		        {!phoneNumbers && (
	        			<>
					        <input 
					          type="text"
					        />
					        <br/>
					    </>
	        		)
		        }



		        <label>Addresses</label>
		        <br/>
		        {addresses && addresses.map(address => {
		        	return (
	        			<>
					        <textarea 
					          type="text"
					          value={address}
					        />
					        <br/>
					    </>
	        		)
		        })}
		        {!addresses && (
	        			<>
					        <input 
					          type="text"
					        />
					        <br/>
					    </>
	        		)
		        }

		        <label>Company</label>
		        <br />
		        <input 
		          type="text"
		          value={company || ""}
		        />
		        <br />




	        {/*<label>Body</label>
	        <br />
	        <textarea
	          value={body}
	          onChange={(e) => setBody(e.target.value)}
	        >
	        </textarea>
	        <br />
	        <button
	          onClick={(e)=> setId(note.id)}
	        >
	          Update
	        </button>
	        <button
	          onClick={ (e) => { 
	            console.log(note);
	            dispatch(notesActions.deleteNote(note))
	              .then(() => dispatch(notesActions.getNotes()))
	              .then(() => dispatch(notebooksActions.getNotebookNotes(notebookId)));
	          }}
	        > Delete
	        </button>*/}
	      </form>

		</div>
	)
};

export default FormPersonRU;