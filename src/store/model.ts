import { createStore, persist } from 'easy-peasy';
import { AppModel, appModel } from './modules/app';
import { auth, AuthModel } from './modules/auth';
import storage from './storage';

export interface StoreModel {
    auth: AuthModel,
    app: AppModel
}

const storeModel: StoreModel = {
    app: appModel,
    auth: persist(auth, {
        storage
    })
};

export default createStore(storeModel);
