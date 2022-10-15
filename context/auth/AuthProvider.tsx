import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useReducer } from 'react'
import { tesloApi } from '../../api'
import { IUser } from '../../interfaces/user'
import { AuthContext, authReducer } from './'

export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

interface Props {
  children: ReactNode
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  const router = useRouter()

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    if (!Cookies.get('token')) return

    try {
      const { data } = await tesloApi.get('/users/validate-token')
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
    } catch (error) {
      Cookies.remove('token')
    }
  }

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/users/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/users/register', {
        name,
        email,
        password,
      })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      return {
        hasError: false,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        }
      }

      return {
        hasError: true,
        message: 'User could not be create. Try again',
      }
    }
  }

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('cart')
    router.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
