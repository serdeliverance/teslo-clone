import { FC, ReactNode, useReducer } from 'react';
import { IUser } from '../../interfaces/user';
import { AuthContext, authReducer } from './';

export interface AuthState {
    isLoggedIn: boolean
    user?: IUser
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props {
    children: ReactNode
}


export const AuthProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer , AUTH_INITIAL_STATE );

    return (
        <AuthContext.Provider value={{
            ...state
        }}>
            { children }
        </AuthContext.Provider>
    )
};