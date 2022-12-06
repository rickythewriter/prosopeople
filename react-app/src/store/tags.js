//constants
const LOAD_TAGS = 'tags/LOAD_TAGS'
const ADD_TAG = 'tags/ADD_TAG'
const REMOVE_TAG = 'tags/REMOVE_TAG'

const LOAD_DOSSIER_TAGS = 'tags/LOAD_DOSSIER_TAGS'
const CLEAR_DOSSIER_TAGS = 'tags/CLEAR_DOSSIER_TAGS'
const ADD_DOSSIER_TAG = 'tags/ADD_DOSSIER_TAG'
const REMOVE_DOSSIER_TAG = 'tags/REMOVE_DOSSIER_TAG'

const CLEAR_FILTER_TAGS = 'tags/CLEAR_FILTER_TAGS'
const ADD_FILTER_TAG = 'tags/ADD_FILTER_TAG'
const REMOVE_FILTER_TAG = 'tags/REMOVE_FILTER_TAG'

/*---------------------------------------------------------------------/
    Actions
/---------------------------------------------------------------------*/

const getTags = (tags) => ({
    type: LOAD_TAGS,
    tags
})

const addTag = (tag) => ({
    type: ADD_TAG,
    tag
})

const removeTag = (tag) => ({
    type: REMOVE_TAG,
    tag
})

const getDossierTags = (tags) => ({
    type: LOAD_DOSSIER_TAGS,
    tags
})

export const removeDossierTags = () => {
    return {
        type: CLEAR_DOSSIER_TAGS
    }
}

const addDossierTag = (tag) => ({
    type: ADD_DOSSIER_TAG,
    tag
})

const removeDossierTag = (tag) => ({
    type: REMOVE_DOSSIER_TAG,
    tag
})

export const addFilterTag = (tag) => ({
    type: ADD_FILTER_TAG,
    tag
})

export const removeFilterTag = (tag) => ({
    type: REMOVE_FILTER_TAG,
    tag
})

export const clearFilterTags = () => {
    return {
        type: CLEAR_FILTER_TAGS
    }
}

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
    dispatch(getDossierTags(data));
    return data;
}

export const createTag = (newTag) =>  async dispatch => {
    const res = await fetch(`/api/tags/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTag)
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(addTag(data))
        return data
    }
}

export const associateTag = (newPersonTagAssoc, tag) =>  async dispatch => {
    const res = await fetch(`/api/tags/${tag.id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPersonTagAssoc)
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(addDossierTag(data))
        return data
    }
}

export const dissociateTag = (person, tag) => async dispatch => {
    const res = await fetch(`/api/people/${person.id}/tags/${tag.id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(removeDossierTag(data))
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

const initialState = { user: {}, person: {}, filter: {} }

export const tagsReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_TAGS:
            const tags = {}
            const allTags = action.tags.tags;
            allTags.forEach(tag => {tags[tag.id] = tag})
            newState.user = {...tags}
            return newState
        case LOAD_DOSSIER_TAGS:
            const dossierTags = {}
            const allDossierTags = action.tags.tags;
            allDossierTags.forEach(tag => {dossierTags[tag.id] = tag})
            newState.person = {...dossierTags}
            return newState
        case ADD_TAG:
            newState.user[action.tag.id] = action.tag
            return newState;
        case ADD_DOSSIER_TAG:
            newState.person[action.tag.id] = action.tag
            return newState;
        case CLEAR_DOSSIER_TAGS:
            newState.person = {}
            return newState
        case CLEAR_FILTER_TAGS:
            newState.filter = {}
            return newState
        case ADD_FILTER_TAG:
            newState.filter[action.tag.id] = action.tag
            return newState;
        case REMOVE_TAG:
            delete newState.user[action.tag.id]
            return newState;
        case REMOVE_DOSSIER_TAG:
            delete newState.person[action.tag.id]
            return newState;
        case REMOVE_FILTER_TAG:
            delete newState.filter[action.tag.id]
            return newState;
        default:
            return state;
    }
}