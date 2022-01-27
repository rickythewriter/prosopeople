//constants

const LOAD_PEOPLE = 'people/LOAD_PEOPLE'
const ADD_PERSON = 'people/ADD_PERSON'
const REMOVE_PERSON = 'people/REMOVE_PERSON'

/*---------------------------------------------------------------------/
	Actions
/---------------------------------------------------------------------*/
const getPeople = (people) => ({
	type: LOAD_PEOPLE,
	people
});

const addPerson = (person) => ({
    type: ADD_PERSON,
    person
})

const removePerson = (person) => ({
    type: REMOVE_PERSON,
    person
})

/*---------------------------------------------------------------------/
	Dispatch Functions
/---------------------------------------------------------------------*/

export const loadPeople = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/people`)
    const data = await res.json();
    dispatch(getPeople(data));
    return data;
}

export const createPerson = (newPerson, user) =>  async dispatch => {
    const res = await fetch(`/api/users/${user.id}/people`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPerson)
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(addPerson(data))
        return data
    }
}

export const updatePerson = person => async dispatch => {
    const res = await fetch(`/api/people/${person.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    })
    if(res.ok){
        const data = await res.json();
        dispatch(addPerson(data))
        return data;
    }
}

export const deletePerson = (person) => async dispatch => {
    const res = await fetch(`/api/people/${person.id}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    if(res.ok) {
        dispatch(removePerson(data))
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
        case LOAD_PEOPLE:
        	const people = {}
        	const allPeople = action.people.people;
        	// console.log("These are all the people");
        	// console.log(allPeople);
        	allPeople.forEach(person => {people[person.id] = person
        	})
        	return {...state, ...people}
        case ADD_PERSON:
            newState[action.person.id] = action.person
            return newState;
        case REMOVE_PERSON:
            console.log("This is person: ", newState[action.person]);
            console.log("This is what [action.person.id] selects: ", newState[action.person.id]);
            delete newState[action.person.id]
            console.log("This is the new state: ", newState)
            return newState;
        default:
            return state;
    }
}