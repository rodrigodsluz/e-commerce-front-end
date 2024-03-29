import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Layout } from '../components';
import { getProducts } from '../api/apiCore';
import Card from '../components/Card';
import Search from '../components/Search';

const Home: React.FC = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <>
      <Head>
        <title>Lifeasier</title>
      </Head>
      <Layout
        title="FullStack React Node MongoDB Ecommerce App"
        description="Node React E-commerce App"
        className="container-fluid"
      >
        <Search />
        <h2 className="mb-4">New Arrivals</h2>
        <div className="row">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>

        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;
