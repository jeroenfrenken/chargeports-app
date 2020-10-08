import { action, Action } from 'easy-peasy';

export interface AppModel {
    isLoading: boolean,
    setIsLoading: Action<AppModel, boolean>;
}

export const appModel: AppModel = {
    isLoading: false,
    setIsLoading: action<AppModel>((
        state,
        isLoading: boolean
    ) => {
        state.isLoading = isLoading;
    })
} as AppModel;
