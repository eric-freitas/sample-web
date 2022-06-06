import AppProps from '../models/AppProps';

export type AppDataManagerProps = {
    get : () => AppProps,
    set : (data: AppProps) => void;
}

const appDataManagerClosure = ():AppDataManagerProps => {
    let data : AppProps;
    return {
        get: () => data,
        set: (d:AppProps) => data = d
    }
}

const appDataManager: AppDataManagerProps = appDataManagerClosure();
export default appDataManager;


