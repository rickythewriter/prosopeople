import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPeople, loadPeopleMultipleTags } from '../../store/people'
import { loadUserTags, createTag, deleteTag, addFilterTag, removeFilterTag, clearFilterTags} from '../../store/tags'
import TagSlip from '../TagSlip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import './TagsFilterCRD.css'

const TagsFilterCRD = () => {
	const user = useSelector(state => state.session.user)
	const person = useSelector(state => state.person)
	const tagsObj = useSelector(state => state.tags)
	const tags = Object.values(tagsObj.user)
	const tagsFilter = Object.values(tagsObj.filter)
	const [tagName, setTagName] = useState("")
	const [errors, setErrors] = useState([])
	const dispatch = useDispatch()

	/* Load all of a user's tags, when no person is selected */
	useEffect(() => {
		const personSelected = Object.values(person).length;
		if (!personSelected) {dispatch(loadUserTags(user));}
	}, [dispatch, person, user])

	/* Handle add tag submission */
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (tagName.length === 0) {
			/* Error Handler (front end): There must be a name */
            setErrors(["Please name your tag."])
            return
        } else if (tagName.length > 50) {
        	/* Error Handler (front end): Name must not exceed 100 characters */
        	setErrors(["A tag name must be 50 characters or fewer."])
        	return
        }
        else {
        	/* Create new Tag */
            const payload = {
                name: tagName,
                user_id: user.id
            }
            // console.log(payload)
            const newTag = await dispatch(createTag(payload, user))
            	.catch(async(res)=> {
                	const data = await res.json()
                	if (data && data.errors) setErrors(data.errors)
            	}
            )
            setTagName("");
            setErrors([])
        // }
	    }
    }


	/* Handle tag clicks - add/remove from filter */
	const handleClick = (tag, tagSelected, tagsFilter) => {
		if (tagSelected) {
			dispatch(removeFilterTag(tag))
		} else if (!tagSelected) {
			dispatch(addFilterTag(tag))
		}
	}

	/* Load tagged people every time the filter tags change */
	useEffect(()=> {
		if (tagsFilter.length === 0) {
			// console.log('No filters applied.')
			dispatch(loadPeople(user))
		} else {
			dispatch(loadPeopleMultipleTags(tagsFilter))
		}
	}, [dispatch, tagsObj, user])

	/* Delete tag (in a cascade); clear from state */
	const handleDelete = (tag) => {
		dispatch(deleteTag(tag));
		dispatch(removeFilterTag(tag));
	}
	
	/* Sort tags array by alphabetical order */
	tags.sort(function(a,b) {
		const nameA = a.name.toLowerCase() 
		const nameB = b.name.toLowerCase()
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1
		}
		return 0
	});

	return (
		<div 
			className="horizontal-panel-R horizontal-panel" 
			id="container-tags-user"
		>
			<div className="row-name-clear">
				<h4
					className='panel-heading'
				>
					Tags
				</h4>
				<div>
					<FontAwesomeIcon 
						icon={faDeleteLeft} 
						id="clear-icon"
						onClick={()=>{
							dispatch(clearFilterTags())
							setErrors([])
						}}
					/>
				</div>
			</div>

			<div className='tags-stack user-tags'>

				<div id="tag-form-create">
					<form 
						onSubmit={handleSubmit}
					>
						<label>Tag Name Form</label>
						<div className="tag-form-create">
					        <input 
					          type="text"
					          value={tagName || ""}
					          onChange={(e) => setTagName(e.target.value)}
					        />
					        <FontAwesomeIcon 
					        	icon={faPlus} 
					        	onClick={handleSubmit}
					        	id="button-create-tag"
					        />
					    </div>
					    {errors.map((error, idx) => <div className="error-message" id="new-name-error" key={idx}>{error}</div>)}
					</form>
				</div>
			 	{tags.map( tag => {
			 		
			 		let isSelected = false

					if(tagsObj.filter[tag.id]) {
						isSelected = true	
					}

			 		return (
			 			<TagSlip 
			 				tag={tag}
			 				clickable={true}
			 				selected={isSelected}
			 				handleClick={handleClick}
			 				clickArgs={[tag, isSelected, tagsFilter]}
			 				handleDelete={handleDelete}
			 				deletionArgs={[tag]}
			 				key={tag.id}
			 			/>
			 		)
			 	})}
			</div>
		</div>
	)
}

export default TagsFilterCRD;