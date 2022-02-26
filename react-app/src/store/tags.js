//constants
const LOAD_TAGS = 'tags/LOAD_TAGS'
const LOAD_DOSSIER_TAGS = 'tags/LOAD_DOSSIER_TAGS'
const CLEAR_TAGS = 'tags/CLEAR_TAGS'
const REMOVE_TAG = 'tags/REMOVE_TAG'
const REMOVE_DOSSIER_TAG = 'tags/REMOVE_DOSSIER_TAG'

/*---------------------------------------------------------------------/
    Actions
/---------------------------------------------------------------------*/

const getTags = (tags) => ({
    type: LOAD_TAGS,
    tags
})

const getDossierTags = (tags) => ({
    type: LOAD_DOSSIER_TAGS,
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

const removeDossierTag = (tag) => ({
    type: REMOVE_DOSSIER_TAG,
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
    dispatch(getDossierTags(data));
    return data;
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

const initialState = { user: {}, person: {} }

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
        case CLEAR_TAGS:
            newState.person = {}
            return newState
        case REMOVE_TAG:
            delete newState.user[action.tag.id]
            return newState;
        case REMOVE_DOSSIER_TAG:
            delete newState.person[action.tag.id]
            return newState;
        default:
            return state;
    }
}