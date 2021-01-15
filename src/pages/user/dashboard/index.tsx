import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Layout } from '../../../components';

import { isAuthenticated } from '../../../api/auth';
import { getPurchaseHistory } from '../../../api/apiUser';

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const {
    user: { _id, name, email, role 
},
  } = isAuthenticated();
  const { token } = isAuthenticated();

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => (
    <div className="card">
      <h4 className="card-header">User Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link href="/cart">My Cart</Link>
        </li>
        <li className="list-group-item">
          <Link href={`/profile/${_id}`}>Update Profile</Link>
        </li>
      </ul>
    </div>
  );

  const userInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">
          {role === 1 ? 'Admin' : 'Registered User'}
        </li>
      </ul>
    </div>
  );

  const purchaseHistory = (history) => (
    <div className="card mb-5">
      <h3 className="card-header">Purchase history</h3>
      <ul className="list-group">
        <li className="list-group-item">
          {history.map(
            (h: {
              products: {
                name: React.ReactNode;
                price: React.ReactNode;
                createdAt: moment.MomentInput;
              }[];
            }) => (
              <div>
                <hr />
                {h.products.map(
                  (
                    p: {
                      name: React.ReactNode;
                      price: React.ReactNode;
                      createdAt: moment.MomentInput;
                    },
                    i: React.Key,
                  ) => (
                    <div key={i}>
                      <h6>Product name: {p.name}</h6>
                      <h6>Product price: ${p.price}</h6>
                      <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                    </div>
                  ),
                )}
              </div>
            ),
          )}
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
