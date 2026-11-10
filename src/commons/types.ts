export interface IResponse<T> {
    status?: number;
    success?: boolean;
    message?: string;
    data?: T
}

export interface Validator {
    message: string;
    uid: string;
    validate: (value: string) => Promise<boolean> | boolean;
}