import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { read, listRelated } from '../../../api/apiCore';
import Card from '../../../components/Card';

const Product = props => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    console.log(error);
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    // const { productId } = props.match.params;
    loadSingleProduct(router.query.id);
  }, [props]);

  return (
    <Layout title="eae" description="eae" className="container-fluid">
      <div className="row">
        <div className="col-8">
          {product /* && product.description  */ && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>

        <div className="col-4">
          <h4>Related products</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3" key={i}>
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
