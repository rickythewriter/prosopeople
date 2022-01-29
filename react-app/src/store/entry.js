/*---------------------------------------------------------------------/
	Constants
/---------------------------------------------------------------------*/

const LOAD_ENTRY = 'people/LOAD_ENTRY'
const CLEAR_ENTRY = 'people/CLEAR_ENTRY'

/*---------------------------------------------------------------------/
	Actions
/---------------------------------------------------------------------*/

const getEntry = (entry) => ({
    type: LOAD_ENTRY,
    entry
})

export const removeEntry = () => {
    return {
        type: CLEAR_ENTRY
    }
}

/*---------------------------------------------------------------------/
	Dispatch Functions
/---------------------------------------------------------------------*/

export const loadEntry = (entry) => async dispatch => {
    const res = await fetch(`/api/entries/${entry.id}`)
    const data = await res.json();
    dispatch(getEntry(data));
    return data;
}

/*---------------------------------------------------------------------/
	Reducers
/---------------------------------------------------------------------*/

const initialState = { }

export const entryReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_ENTRY:
            const entry = action.entry;
            return {...newState, ...entry};
        case CLEAR_ENTRY:
            return {};
        default:
            return state;
    }
}