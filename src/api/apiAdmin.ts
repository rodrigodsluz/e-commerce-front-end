import { API } from './services';

export const createCategory = (userId, token, category) =>
  fetch(`${API}/category/create/${userId}`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(category),
})
  .then(response => response.json())
  .catch(err => {
    console.log(err);
  });

// export const updateCategory = (categoryId, userId, token, category) => fetch(`${API}/category/${categoryId}/${userId}`, {
//     method: 'PUT',
//     headers: {
//       // content type?
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(category),
//   })
//     .then((response) => response.json())
//     .catch((err) => console.log(err));

export const createProduct = (userId, token, product) => fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

export const getCategory = categoryId =>
  fetch(`${API}/category/${categoryId}`, {
  method: 'GET',
})
  .then(response => response.json())
  .catch(err => console.log(err));

export const getCategories = () =>
  fetch(`${API}/categories`, {
  method: 'GET',
})
  .then(response => response.json())
  .catch(err => console.log(err));

export const listOrders = (userId, token) => fetch(`${API}/order/list/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

export const getStatusValues = (userId, token) =>
  fetch(`${API}/order/status-values/${userId}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(response => response.json())
  .catch(err => console.log(err));

export const updateOrderStatus = (userId, token, orderId, status) => fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, orderId }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

// /**
//  * to perform crud on product
//  * get all products
//  * get a single product
//  * update single product
//  * delete single product
//  */

export const getProducts = () =>
  fetch(`${API}/products?limit=undefined`, {
  method: 'GET',
})
  .then(response => response.json())
  .catch(err => console.log(err));

export const deleteProduct = (productId, userId, token) =>
  fetch(`${API}/product/${productId}/${userId}`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(response => response.json())
  .catch(err => console.log(err));

export const getProduct = (productId) => fetch(`${API}/product/${productId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

export const updateProduct = (productId, userId, token, product) =>
  fetch(`${API}/product/${productId}/${userId}`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: product,
})
  .then(response => response.json())
  .catch(err => console.log(err));
