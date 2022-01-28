//constants
const LOAD_PERSON = 'people/LOAD_PERSON'

/*---------------------------------------------------------------------/
    Actions
/---------------------------------------------------------------------*/

const getPerson = (person) => ({
    type: LOAD_PERSON,
    person
})

/*---------------------------------------------------------------------/
    Dispatch Functions
/---------------------------------------------------------------------*/

export const loadPerson = (person) => async dispatch => {
    const res = await fetch(`/api/people/${person.id}`)
    const data = await res.json();
    dispatch(getPerson(data));
    return data;
}

/*---------------------------------------------------------------------/
    Reducers
/---------------------------------------------------------------------*/

const initialState = { }

export const personReducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_PERSON:
            const person = action.person;
            return {...newState, ...person};
        default:
            return state;
    }
}