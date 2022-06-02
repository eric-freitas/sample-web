import { createContext } from 'react';
import AppContextData from '../models/AppContext';

const initialContext: AppContextData = {
    loadingPage: null
}

const AppContext = createContext(initialContext);

export default AppContext;