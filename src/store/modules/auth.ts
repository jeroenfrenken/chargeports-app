import { action, Action, thunk, Thunk } from 'easy-peasy';
import { User } from '../../api';
import { ApiService } from '../../service/ApiService';
import { StoreModel } from '../model';

export interface AuthModel {
    token: string | null,
    isLoggedIn: boolean,
    user: User | null,
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
        {
            getStoreActions
        }
    ) => {
        const user = await ApiService.authenticate(token);

        if (user === null) {
            throw new Error('Authentication failed');
        }

        actions.setUser(user);
        actions.login(token);
        getStoreActions().app.setIsLoading(false);
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
        user: User
    ) => {
        state.user = user;
    }),
    logout: action<AuthModel>((
        state
    ) => {
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
    })
} as AuthModel;
