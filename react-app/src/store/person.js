//constants
const LOAD_PERSON = 'people/LOAD_PERSON'
const CLEAR_PERSON = 'people/CLEAR_PERSON'

/*---------------------------------------------------------------------/
    Actions
/---------------------------------------------------------------------*/

const getPerson = (person) => ({
    type: LOAD_PERSON,
    person
})

export const removePerson = () => {
    return {
        type: CLEAR_PERSON
    }
}

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
        case CLEAR_PERSON:
            return {};
        default:
            return state;
    }
}