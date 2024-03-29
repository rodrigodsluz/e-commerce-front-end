import { API } from '../api/services';

export const read = (userId, token) =>
  fetch(`${API}/user/${userId}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(response => response.json())
  .catch(err => console.log(err));

export const update = (userId, token, user) =>
  fetch(`${API}/user/${userId}`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(user),
})
  .then(response => response.json())
  .catch(err => console.log(err));

export const updateUser = (user, next) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('jwt')) {
      const auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user = user;
      localStorage.setItem('jwt', JSON.stringify(auth));
      next();
    }
  }
};

export const getPurchaseHistory = (userId, token) =>
  fetch(`${API}/orders/by/user/${userId}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(response => response.json())
  .catch(err => console.log(err));
