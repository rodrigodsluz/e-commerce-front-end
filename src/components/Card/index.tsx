import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ShowImage from '../../components/ShowImages';
import { addItem, updateItem, removeItem } from '../../api/apiCart';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const showViewButton = showViewProductButton =>
    showViewProductButton && (
      <Link href={`/product/${product._id}`} className="mr-2">
        <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
          View Product
        </button>
      </Link>
  );

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      router.push('/cart');
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => showAddToCartButton && (
      <button
        onClick={addToCart}
        className="btn btn-outline-warning mt-2 mb-2 card-btn-1  "
      >
        Add to cart
      </button>
    );

  const showStock = quantity =>
    // ESlint Son of a bitch
    quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate =>
    cartUpdate && (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      </div>
  );

  const showRemoveButton = showRemoveProductButton =>
    showRemoveProductButton && (
      <button
        onClick={() => {
          removeItem(product._id);
          setRun(!run); // run useEffect in parent Cart
        }}
        className="btn btn-outline-danger mt-2 mb-2"
      >
        Remove Product
      </button>
  );

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">{`R$ ${product.price}`}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
