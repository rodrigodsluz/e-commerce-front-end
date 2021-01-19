import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getCart } from '../../api/apiCart';
import Card from '../../components/Card';
import Checkout from '../../components/Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => (
    <div>
      <h2>Your cart has {`${items.length}`} items</h2>
      <hr />
      {items.map((product, i) => (
        <Card
          key={i}
          product={product}
          showAddToCartButton={false}
          cartUpdate
          showRemoveProductButton
          setRun={setRun}
          run={run}
        />
      ))}
    </div>
  );

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link href="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
