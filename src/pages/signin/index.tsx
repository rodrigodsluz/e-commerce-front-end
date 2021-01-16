import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { signin, authenticate, isAuthenticated } from '../../api/auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'ryan@gmail.com',
    password: 'rrrrrr9',
    error: false,
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer 
} = values;
  /*   const { user } = isAuthenticated();
   */
  const handleChange = (name: string) => (event: {
    target: { value: any };
  }) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
  );

  const redirectUser = () => {
    const router = useRouter();

    /* if (redirectToReferrer) {
      if (user && user.role === 1) {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    } */
    if (isAuthenticated()) {
      router.push('/');
    }
  };

  return (
    <Layout
      title="Signin"
      description="Signin to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
