import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../../config/Config';
import Editor from '../../Editor';
import '../../../css/AddPoojaStore.css';

function EditPoojaStore() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [translations, setTranslations] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/admin/pujastore/${productId}`);
                const data = await response.json();
                if (response.ok) {
                    setProduct(data);
                    setTranslations(data._translations);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching product');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/api/categories/all');
                const data = await response.json();
                if (response.ok) {
                    setCategories(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Error fetching categories');
            }
        };

        fetchProduct();
        fetchCategories();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleTranslationChange = (index, field, value) => {
        setTranslations((prevTranslations) => {
            const updatedTranslations = [...prevTranslations];
            updatedTranslations[index] = {
                ...updatedTranslations[index],
                [field]: value,
            };
            return updatedTranslations;
        });
    };


    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            _category: {
                ...prevProduct._category,
                id: value,
            },
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const productInfo = {
            price: product._price,
            discount: product._discount,
            categoryId: product._category,
            status: product._status,
            translations: translations.map((translation) => ({
                language_code: translation.language_code,
                title: translation.title,
                description: translation.description,
            })),
        };

        const productData = JSON.stringify(productInfo);


        console.log(productData);

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/admin/pujastore/edit/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: productData,
            });

            if (response.ok) {
                // Redirect or show success message
            } else {
                setError('Error updating product');
            }
        } catch (err) {
            setError('Error updating product');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="add-pooja-store">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="text"
                        name="_price"
                        value={product._price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Discount</label>
                    <input
                        type="text"
                        name="_discount"
                        value={product._discount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="_status"
                        value={product._status}
                        onChange={handleChange}
                        required
                    >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="_category"
                        value={product._category.id}
                        onChange={handleCategoryChange}
                        required
                    >
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category._translations.find((t) => t.language_code === 'en').name}
                            </option>
                        ))}
                    </select>
                </div>
                {translations.map((translation, index) => (
                    <div key={index} className="translation-group">
                        <h3>{translation.language_code.toUpperCase()}</h3>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={translation.title}
                                onChange={(e) => handleTranslationChange(index, 'title', e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <Editor
                                data={translation.description}
                                onChange={(value) => handleTranslationChange(index, 'description', value)}
                            />
                        </div>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Update Store Product</button>
            </form>
        </div>
    );
}

export default EditPoojaStore;
