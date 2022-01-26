//constants

const LOAD_PEOPLE = 'people/LOAD_PEOPLE'

/*---------------------------------------------------------------------/
	Actions
/---------------------------------------------------------------------*/
const getPeople = (people) => ({
	type: LOAD_PEOPLE,
	people
});

/*---------------------------------------------------------------------/
	Dispatch Functions
/---------------------------------------------------------------------*/

export const loadPeople = user => async dispatch => {
    const res = await fetch(`/api/users/${user.id}/people`)
    const data = await res.json();
    dispatch(getPeople(data));
    return data;
}


/*---------------------------------------------------------------------/
	Reducers
/---------------------------------------------------------------------*/

const initialState = { }

export const peopleReducer = (state = initialState, action) => {
    // const newState = {...state}
    switch (action.type) {
        case LOAD_PEOPLE:
        	const people = {}
        	const allPeople = action.people.people;
        	console.log("These are all the people");
        	console.log(allPeople);
        	allPeople.forEach(person => {people[person.id] = person
        	})
        	return {...state, ...people}
        default:
            return state;
    }
}