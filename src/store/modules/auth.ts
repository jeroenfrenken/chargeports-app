import { action, Action, thunk, Thunk } from 'easy-peasy';
import { StoreModel } from '../model';

export interface AuthModel {
    token: string | null,
    isLoggedIn: boolean,
    user: object | null,
    authenticate: Thunk<AuthModel, string, any, StoreModel, void>;
    login: Action<AuthModel, string>;
    setUser: Action<AuthModel, object>;
    logout: Action<AuthModel>;
}

export const auth: AuthModel = {
    token: null,
    isLoggedIn: false,
    user: null,
    authenticate: thunk<AuthModel, string, any, StoreModel, void>(async (
        actions,
        token: string,
        { getStoreActions }
    ) => {

    }),
    login: action<AuthModel>((
        state,
        token: string
    ) => {
        state.token = token;
        state.isLoggedIn = true;
    }),
    setUser: action<AuthModel>((
        state,
        user: object
    ) => {
        state.user = user;
    }),
    logout: action<AuthModel>((
        state
    ) => {
    })
} as AuthModel;
