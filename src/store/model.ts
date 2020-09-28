import { createStore, persist } from 'easy-peasy';
import storage from './storage';

export interface StoreModel {

}

const storeModel: StoreModel = {
};

export default createStore(storeModel);
