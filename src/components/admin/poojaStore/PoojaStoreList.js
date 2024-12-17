import React, { useEffect, useState } from 'react';
import Config from '../../../config/Config';
import { Link } from 'react-router-dom';
import '../../../css/PoojaStoreList.css'; // Make sure to create this CSS file

function PoojaStoreList() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${Config.apiUrl}${Config.endpoints.pujastoreAdmin}?page=${page}&limit=${limit}`);
                const data = await response.json();

                if (response.ok) {
                    setProductData(data.data);
                    setTotalPages(data.pages);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, limit]);

    const handleDelete = async (productId) => {
        // Implement the delete logic here
        // For example:
        try {
            const response = await fetch(`${Config.apiUrl}${Config.endpoints.pujastore}/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProductData(prevData => prevData.map(category => ({
                    ...category,
                    _products: category._products.filter(product => product._id !== productId)
                })));
            } else {
                console.error('Failed to delete product');
            }
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const handlePageChange = (newPage) => {
      
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }




    return (
        <div className="puja-store-list">
        <h2>Pooja Store Products</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((category) =>
                category._products.map((product) => {
                  const categoryDetails = category._translations.find((trans) => trans.language_code === 'en');
                  const productDetails = product._translations.find((trans) => trans.language_code === 'en');
                  return (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={`${Config.apiUrl}${product._images[0]}`}
                          alt={productDetails?.title}
                          style={{ width: '70px', height: 'auto' }}
                        />
                      </td>
                      <td>{productDetails?.title}</td>
                      <td>{categoryDetails?.name}</td>
                      <td>{product._price}</td>
                      <td>{product._discount}</td>
                      <td>{product._status}</td>
                      <td>
                        <Link to={`/admin/store/edit/${product._id}`} className="btn btn-edit">
                          Edit
                        </Link>
                        <button onClick={() => handleDelete(product._id)} className="btn btn-delete">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      
        <div className="col-12">
          <div className="pagination d-flex justify-content-center mt-5">
            <button
              className="rounded page-link"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              &laquo;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`rounded page-link ${index + 1 === page ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="rounded page-link"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
   
    );
}

export default PoojaStoreList;
