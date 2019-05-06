const baseUrl = 'http://localhost:3000'

export const loginUser = (loginData) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${baseUrl}/auth/login`, opts)
    .then(resp=>resp.json())
}

export const registerUser = (registerData) => {
    const options = {
        method: 'POST', 
        body: JSON.stringify({ user: registerData }),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    return fetch(`${baseUrl}/users/`, options)
    .then(resp => resp.json())
    .then(resp=> console.log(resp))
    .catch(err => console.log(err))
}

export const getDose = (userId) => {
    return fetch(`${baseUrl}/users/${userId}/doses`)
    .then(resp=>resp.json())
}