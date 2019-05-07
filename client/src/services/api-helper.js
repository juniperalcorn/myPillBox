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

export const getPills = () => {
    return fetch(`${baseUrl}/pills`)
    .then(resp=>resp.json())
}

export const getDose = (userId) => {
    return fetch(`${baseUrl}/users/${userId}/doses`)
    .then(resp=>resp.json())
}

export const createDose= (data, userId) => {
    const opts = {
      method: 'POST',
      body: JSON.stringify({ dose: data }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }
    return fetch(`${baseUrl}/users/${userId}/doses`, opts)
      .then(resp => resp.json())
  }

export const updateDose = (data, userId, doseId) => {
    const opts = {
        method: 'UPDATE',
        body: JSON.stringify({ dose: data }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      }
      return fetch(`${baseUrl}/users/${userId}/doses/${doseId}`, opts)
      .then(resp => resp.json())
}

export const deleteDose = (userId, doseId) => {
    const opts = {
        method: 'DELETE',
        body: JSON.stringify(doseId),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    return fetch(`${baseUrl}/users/${userId}/doses/${doseId}`, opts)
    .catch(e=> e.message.json())
}