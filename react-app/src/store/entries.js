//constants

const LOAD_ENTRIES = 'entries/LOAD_ENTRIES'
const ADD_ENTRY = 'entries/ADD_ENTRY'
const REMOVE_ENTRY = 'entries/REMOVE_ENTRY'

/*---------------------------------------------------------------------/
	Actions
/---------------------------------------------------------------------*/
const getEntries = (entries) => ({
	type: LOAD_ENTRIES,
	entries
});

const addEntry = (entry) => ({
    type: ADD_ENTRY,
    entry
})

const removeEntry = (entry) => ({
    type: REMOVE_ENTRY,
    entry
})


/*---------------------------------------------------------------------/
	Dispatch Functions
/---------------------------------------------------------------------*/

export const loadEntries = (user, person) => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/people/${person.id}/entries`)
    const data = await res.json();
    dispatch(getEntries(data));
    return data;
}

export const createEntry = (newEntry, user, person) =>  async dispatch => {
    const res = await fetch(`/api/users/${user.id}/people/${person.id}/entries`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newEntry)
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(addEntry(data))
        return data
    }
}

export const updateEntry = entry => async dispatch => {
    const res = await fetch(`/api/entries/${entry.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    if(res.ok){
        const data = await res.json();
        dispatch(addEntry(data))
        return data;
    }
}

export const deleteEntry = (entry) => async dispatch => {
    const res = await fetch(`/api/entries/${entry.id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(removeEntry(data))
        return data
    }
}


/*---------------------------------------------------------------------/
	Reducers
/---------------------------------------------------------------------*/

const initialState = { }

export const peopleReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_ENTRIES:
        	const entries = {}
        	const allEntries = action.entries.entries;
        	allEntries.forEach(entry => {entries[entry.id] = entry
        	})
        	return {...state, ...entries}
        case ADD_ENTRY:
            newState[action.entry.id] = action.entry
            return newState;
        case REMOVE_ENTRY:
            delete newState[action.entry.id]
            return newState;
        default:
            return state;
    }
}