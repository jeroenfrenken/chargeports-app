import { createStore, persist } from 'easy-peasy';
import { auth, AuthModel } from './modules/auth';
import storage from './storage';

export interface StoreModel {
    auth: AuthModel
}

const storeModel: StoreModel = {
    auth: persist(auth, {
        storage
    })
};

export default createStore(storeModel);
