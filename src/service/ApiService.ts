import { AxiosResponse, AxiosError } from 'axios';
import { Configuration, DefaultApi, User } from '../api';

const basePath = "http://192.168.178.213";

export class ApiService {
    static default: DefaultApi;
    static token: string | null = null;

    public static setup() {
        const config = this.getConfiguration();
        this.default = new DefaultApi(config);
    }

    public static async wrap<T>(call: Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> {
        try {
            return await call;
        } catch (err) {
            if ( err.isAxiosError ) {
                const axiosErr = err as AxiosError<T>;
                console.log(axiosErr.request);
            }
            throw err;
        }
    }

    public static async authenticate(token: string): Promise<User | null> {
        this.token = token;
        ApiService.setup();

        try {
            const res = await ApiService.wrap<User>(ApiService.default.authenticationMe());
            return res.data;
        } catch (e) {
            return null;
        }
    }

    private static getConfiguration() {
        if ( ApiService.token !== null ) {
            return new Configuration({
                apiKey: ApiService.token,
                basePath
            });
        }

        return new Configuration({
            basePath
        });
    }
}
