//constants
const LOAD_TAGS = 'people/LOAD_TAGS'
const CLEAR_TAGS = 'people/CLEAR_TAGS'
const REMOVE_TAG = 'entries/REMOVE_TAG'

/*---------------------------------------------------------------------/
    Actions
/---------------------------------------------------------------------*/

const getTags = (tags) => ({
    type: LOAD_TAGS,
    tags
})

export const removeTags = () => {
    return {
        type: CLEAR_TAGS
    }
}

const removeTag = (tag) => ({
    type: REMOVE_TAG,
    tag
})

/*---------------------------------------------------------------------/
    Dispatch Functions
/---------------------------------------------------------------------*/

export const loadUserTags = (user) => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/tags`)
    const data = await res.json();
    dispatch(getTags(data));
    return data;
}

export const loadPersonTags = (person) => async dispatch => {
    const res = await fetch(`/api/people/${person.id}/tags`)
    const data = await res.json();
    dispatch(getTags(data));
    return data;
}

export const dissociateTag = (person, tag) => async dispatch => {
    const res = await fetch(`/api/people/${person.id}/tags/${tag.id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(removeTag(data))
        return data
    }
}

export const deleteTag = (tag) => async dispatch => {
    const res = await fetch(`/api/tags/${tag.id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(removeTag(data))
        return data
    }
}

/*---------------------------------------------------------------------/
    Reducers
/---------------------------------------------------------------------*/

const initialState = { }

export const tagsReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_TAGS:
            const tags = {}
            const allTags = action.tags.tags;
            allTags.forEach(tag => {tags[tag.id] = tag})
            return {...tags}
        case CLEAR_TAGS:
            return {};
        case REMOVE_TAG:
            delete newState[action.tag.id]
            return newState;
        default:
            return state;
    }
}