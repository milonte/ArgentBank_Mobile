import { UserInterface } from "../models/UserInterface"
import { AppDispatch } from "../store/store"
import { login } from "../store/userSlice"


enum RequestMethods {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE'
}

const API_URL = "http://192.168.1.14:3001/api/v1/"

/**
 * Fetch API function
 * @param method 
 * @param route 
 * @param token 
 * @param body 
 * @returns body Response
 */
const FetchData: (
    method: RequestMethods,
    route: string,
    token: string | null,
    body: Object | null
) => Promise<any> = async (method, route, token, body) => {

    return await fetch(API_URL + route, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Authorization': token ? 'Bearer ' + token : '',
        },
        body: body ? JSON.stringify(body) : null
    })
        .then((res) => res.json())
        .then((json) => {
            if (200 === json.status) {
                return json.body
            } else {
                throw new Error(json.message)
            }
        })
}

/**
 * POST User creditentials, then return User bearer JWT Token
 * @param email User email
 * @param password User password
 * @param dispatch Redux Dispatcher
 * @returns Promise - user TWT token
*/
const GetUserToken: (
    email: string,
    password: string,
    dispatch: AppDispatch
) => Promise<string> = async (email, password, dispatch) => {

    const body = {
        "email": email,
        "password": password
    }

    return await FetchData(RequestMethods.post, 'user/login', null, body)
        .then((data) => {
            if (data.token) {
                return data.token
            }
        })
        .catch(err => {
            dispatch(login({ 'error': err.message }))
            throw new Error(err)
        })
}

/**
 * POST | Returns User profile
 * @param token JWT User token
 */
const GetUserProfile: (
    token: string,
    isRemembered: boolean,
    dispatch: AppDispatch
) => void = async (token, isRemembered, dispatch) => {

    await FetchData(
        RequestMethods.post, 'user/profile', token, null
    ).then(data => {
        if (data.email) {
            const userCredits: UserInterface = {
                'email': data.email,
                'firstName': data.firstName,
                'lastName': data.lastName,
                'token': token,
                'error': null
            }
            dispatch(login(userCredits))

            if (isRemembered) {
                //SetCookie('user', userCredits)
            }
        }
    })
}

/**
 * PUT | Update user firstname & lastname
 * @param user current user
 * @param firstName desired firstName
 * @param lastName desired lastName
 * @param dispatch AppDispatch
 * @returns Promise - User updated
 */
const UpdateUserProfile: (
    user: UserInterface,
    firstName: string,
    lastName: string,
    dispatch: AppDispatch
) => Promise<any> = async (user, firstName, lastName, dispatch) => {

    const body = {
        "firstName": firstName,
        "lastName": lastName
    }

    return await FetchData(
        RequestMethods.put, 'user/profile', user.token, body
    ).then(data => {
        if (data.firstName && data.lastName) {

            const userCredits: UserInterface = {
                ...user,
                'firstName': data.firstName,
                'lastName': data.lastName,
            }
            dispatch(login(userCredits))

            /*  if (GetCookie('user')) {
                 SetCookie('user', userCredits)
             } */
            return data
        }
    })
}

export {
    GetUserToken,
    GetUserProfile,
    UpdateUserProfile
}