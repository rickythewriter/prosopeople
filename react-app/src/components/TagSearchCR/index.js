import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { associateTag, loadPersonTags } from '../../store/tags'
import './TagSearchCR.css'

const TagSearchCR = () => {
	const user = useSelector(state => state.session.user)
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const userTags = Object.values(tagsObj.user)
	// const [errors, setErrors] = useState([])
	const dispatch = useDispatch()

	const handleOnSearch = (string, results) => {
	    // onSearch will have as the first callback parameter
	    // the string searched and for the second the results.
	    console.log(string, results)
	}

	const handleOnHover = (result) => {
		// the item hovered - i.e. the tag being displayed
		console.log(result)
	}

	const handleOnSelect = async (item) => {
		const payload = {
			person_id: person.id,
			tag_id: item.id,
			user_id: user.id
		}
		const newPersonTagAssoc = await dispatch(associateTag(payload, user, person, item))
			// .catch(async(res)=> {
				// const data = await res.json()
            	// if (data && data.errors) setErrors(data.errors)
			// })
	}

	const handleOnFocus = () => {
		// focus - I click into the box
		console.log('Focused')
	}

	const formatResult = (item) => {
		return (
		  <>
		    <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
		    <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
		  </>
		)
	}

	return (
		<div className='tag-search-bar'>
			<ReactSearchAutocomplete
				items={userTags}
	            // onSearch={handleOnSearch}
	            // onHover={handleOnHover}
	            onSelect={handleOnSelect}
	            // onFocus={handleOnFocus}
	            // autoFocus
	            // formatResult={formatResult}
	            styling={{
	            	fontFamily: 'PT Serif',
					// height: "34px",
					// border: "1px solid darkgreen",
					borderRadius: "4px",
					// backgroundColor: "white",
					// hoverBackgroundColor: "lightgreen",
					// color: "darkgreen",
					fontSize: "13px",
					// fontFamily: "Courier",
					// iconColor: "green",
					// lineColor: "lightgreen",
					// placeholderColor: "darkgreen",
					// clearIconMargin: "3px 8px 0 0",
					// zIndex: 2,
	            }}
	        />
	    </div>
	)


}

export default TagSearchCR