import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import { peopleReducer } from './people'
import { personReducer } from './person'
import { entriesReducer } from './entries'
import { entryReducer } from './entry'
import { tagsReducer } from './tags'
import { imageReducer } from './image';

const rootReducer = combineReducers({
  session,
  people: peopleReducer,
  person: personReducer,
  entries: entriesReducer,
  entry: entryReducer,
  tags: tagsReducer,
  images: imageReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
