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

        Parameters:
            user
                - from Redux Store
                    i.e. useSelect(state.session.user)
            tags
                - format: [{...}, {...}]
                - type: array
                - contents: tags
                    e.g. {id: 1, name: 'artist'}
        
    Dispatches people who contain all tags to store
*/
export const loadPeopleMultipleTags = (user, tags) => async dispatch => {

    /* Helper function - load app people without dispatching to reducer */
    const loadPeopleWithoutAction = user => async dispatch => {
        const res = await fetch(`/api/users/${user.id}/people`)
        const data = await res.json();
        return data;
    }

    /* Load all people belonging to user */
    dispatch(loadPeopleWithoutAction(user))
    .then( (peopleObj) => {

        
        /* Reduce people object */
        const peopleAll = {}
        const allPeople = peopleObj.people
        allPeople.forEach(person => {peopleAll[person.id] = person
            })
        const peopleAllReduced = {...peopleAll}
        // console.log('The reduced person object looks like this: ', peopleAllReduced)


        /* create an array of all the tags being loaded */
        const arrPromise = []
        tags.forEach(tag => {
            arrPromise.push(dispatch(loadTaggedPeople(tag)));
        })
        // console.log(arrPromise);


        /* Handle each individual list of tagged people after all promises fulfilled */
        Promise.all(arrPromise)
        .then((res) => {

            // console.log('These are the values of PromiseAll: ', res)
            /* 
                res is of this format:
                    [ {people: Array(1)}, {people: Array(2)}, ... ]
            */


            /* for each array of people, compare with all people */
            const arrPeopleTaggedObj = res.map(peopleSingleTag => {
                // console.log('This is a forEach object: ', peopleSingleTag);
                /*
                    peopleSingleTag is of this format:
                        {people: Array(i)}
                */


                /* 
                    Reduce each member of arrPeopleTaggedObj 
                    e.g.
                        {4: {...}, 5: {...}}
                */
                const peopleSingleTagObjects = {}
                peopleSingleTag = peopleSingleTag.people.forEach(person => {
                    // console.log('this is a person inside peopleSingleTag.people: ', person)
                    peopleSingleTagObjects[person.id] = person;
                })
                peopleSingleTag = peopleSingleTagObjects; // turn [{...}] into {person.id: {person}}
                // console.log('peopleSingleTag after formatting ', peopleSingleTag);
                return peopleSingleTag
            })


            // console.log('This is res after formatting: ', arrPeopleTaggedObj)
            /* 
                arrPeopleTaggedObj is of this format:
                [
                    {4: {...}}
                    {4: {...}, 5: {...}}
                ]
            
                Each element in the array is an object 
                which contains the people with single tag of each loadTaggedPeople call.
            */


            /* 
                Compare peopleAllReduced with each member of arrPeopleTaggedObj.
                Filter out the people who are not intersections.
            */
            arrPeopleTaggedObj.forEach((peopleTaggedReduced) => {
                /*
                    peopleTaggedReduced is of this format:
                        {4: {...}, 5: {...}}
                */


                /* 
                    keysIntersecting is an array, 
                    containing keys of the people and tagged people intersection
                */
                const keysIntersecting = Object.keys(peopleAllReduced).filter(key => key in peopleTaggedReduced)


                /* Remove from people, those persons whose keys are not in the intersection */
                for (const id in peopleAllReduced){
                    /* 
                        If intersecting keys doesn't include person's key,
                            remove it from peopleAllReduced
                    */
                    if (!keysIntersecting.includes(id)){
                        delete peopleAllReduced[id];
                    }
                }
            })

            /* 
                Format people for reducer 
                    format: { people: [{person1}, {person2}, ... ] }
            */
            const peopleWithAllTags = {};
            peopleWithAllTags.people = Object.values(peopleAllReduced)

            /* Dispatch result to reducer */
            dispatch(getPeople(peopleWithAllTags));
            return(peopleWithAllTags);
        })
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