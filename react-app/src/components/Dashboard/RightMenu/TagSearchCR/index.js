import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { associateTag, loadPersonTags } from '../../../../store/tags'
import './TagSearchCR.css'

const TagSearchCR = () => {
	const user = useSelector(state => state.session.user)
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const userTags = Object.values(tagsObj.user)
	// const [errors, setErrors] = useState([])
	const dispatch = useDispatch()

	const handleOnSelect = async (item) => {
		const payload = {
			person_id: person.id,
			tag_id: item.id,
			user_id: user.id
		}
		dispatch(associateTag(payload, item))
	}

	return (
		<div className='tag-search-bar'>
			<ReactSearchAutocomplete
				items={userTags}
	            onSelect={handleOnSelect}
	            styling={{
	            	fontFamily: 'PT Serif',
					borderRadius: "4px",
					fontSize: "13px",
	            }}
	        />
	    </div>
	)


}

export default TagSearchCR