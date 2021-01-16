import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { isAuthenticated } from '../../../api/auth';
import { createCategory } from '../../../api/apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  // const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError(false);
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    // make request to api to create category
    /* createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError(false);
        setSuccess(true);
      }
    }); */
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">aaa is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link href="/admin/dashboard">Back to Dashboard</Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={"G'day aaa, ready to add a new category?"}
      className="color: red"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
