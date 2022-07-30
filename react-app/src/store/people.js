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
    // console.log(`This is the data from load people: `, data);
    dispatch(getPeople(data));
    return data;
}

export const loadTaggedPeople = tag => async dispatch => {
    const res = await fetch(`/api/tags/${tag.id}/people`)
    const data = await res.json();
    // dispatch(getPeople(data));
    return data;
}

/* 
    Load intersection of people with multiple tags
        
    Input: array of tags
        e.g. [ {id: 1, name: 'artist'},
               {id: 2, name: 'celebrity'}, 
               ...,
             ]
    
    Dispatches people who contain all tags to store
*/
export const loadPeopleMultipleTags = (tags) => async dispatch => {

    const peoplePerTag = [];
    tags.forEach(tag => {
        peoplePerTag.push(dispatch(loadTaggedPeople(tag)));
    })

    Promise.all(peoplePerTag)
    .then((res) => {

        let peopleIntersecting = {};
        let peopleFirstTag = res[0].people
        peopleFirstTag.forEach(person => {
            /* Format as { <id1> : {person1}, <id2> : {person2}, ... } */
            peopleIntersecting[person.id] = person;
        })

        res.forEach(peopleWithTag => {
            
            /* Initialize ID's of persons with tag */
            const idsPeopleWithTag = new Set()
            peopleWithTag.people.forEach(person => {
                idsPeopleWithTag.add(person.id);
            })

            /* Update list of intersecting people */
            for (let id in peopleIntersecting) {
                id = parseInt(id)
                const idDoesNotIntersect = (!idsPeopleWithTag.has(id))
                if (idDoesNotIntersect) {
                    delete peopleIntersecting[id];
                }
            }
        })

        /* 
            Format for reducer 
                i.e. { people: [{person1}, {person2}, ... ] }
        */
        const peopleWithAllTags = {};
        peopleWithAllTags.people = Object.values(peopleIntersecting)

        /* Dispatch result to reducer */
        dispatch(getPeople(peopleWithAllTags));
        return (peopleWithAllTags);

    })
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
        	allPeople.forEach(person => {people[person.id] = person
        	})
        	// return {...state, ...people}
            return {...people}
        case ADD_PERSON:
            newState[action.person.id] = action.person
            return newState;
        case REMOVE_PERSON:
            delete newState[action.person.id]
            return newState;
        default:
            return state;
    }
}