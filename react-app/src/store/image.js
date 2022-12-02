/*---------------------------------------------------------------------/
    Constants
/---------------------------------------------------------------------*/

const LOAD_IMAGES = 'entries/LOAD_IMAGES'
const ADD_IMAGE = 'entries/ADD_IMAGE'
const REMOVE_IMAGE = 'entries/REMOVE_IMAGE'

/*---------------------------------------------------------------------/
    Actions
/---------------------------------------------------------------------*/
const getImages = (images) => ({
    type: LOAD_IMAGES,
    images
});

const addImage = (image) => ({
    type: ADD_IMAGE,
    image
})

const removeImage = (image) => ({
    type: REMOVE_IMAGE,
    image
})

/*---------------------------------------------------------------------/
    Dispatch Functions
/---------------------------------------------------------------------*/

export const loadImages = (entry) => async dispatch => {
    const res = await fetch(`/api/entries/${entry.id}/images`)
    const data = await res.json();
    dispatch(getImages(data));
    return data;
}

export const uploadImage = (image) => async dispatch => {
    const form = new FormData();
    form.append('image', image);

    const res = await fetch(`/api/images/upload`, {
        method: 'POST',
        body: form,
    });
    const data = await res.json();
    if (res.ok) {
        return data
    }
}

export const createImage = (newImageWithCaption) => async dispatch => {
    const res = await fetch(`/api/images/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newImageWithCaption),
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(addImage(data))
        return data
    }
}

export const deleteImage = (image) => async dispatch => {
    const res = await fetch(`/api/images/${image.id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if (res.ok) {
        dispatch(removeImage(data))
        return data
    }
}


/*---------------------------------------------------------------------/
    Reducers
/---------------------------------------------------------------------*/

const initialState = {}

export const imageReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_IMAGES:
            const images = {}
            const allEntries = action.images.images;
            allEntries.forEach(image => {
                images[image.id] = image
            })
            return { ...images }
        case ADD_IMAGE:
            newState[action.image.id] = action.image
            return newState;
        case REMOVE_IMAGE:
            delete newState[action.image.id]
            return newState;
        default:
            return state;
    }
}