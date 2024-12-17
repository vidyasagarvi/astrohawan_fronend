import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Editor from '../../Editor';
import '../../../css/AddPoojaStore.css';
import Config from '../../../config/Config';

function AddPoojaStore() {
    const { t } = useTranslation();
    const [titleEn, setTitleEn] = useState('');
    const [titleHi, setTitleHI] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [descriptionHi, setDescriptionHi] = useState('');
    const [storeImages, setStoreImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const productData = new FormData();
        productData.append('price', price);
        productData.append('discount', discount);
        productData.append('categoryId', selectedCategory);

    
        const productInfo = {
            price: price,
            discount: discount,
            categoryId: selectedCategory,
            translations: [
                {
                    language_code: 'en',
                    title: titleEn,
                    description: descriptionEn
                },
                {
                    language_code: 'hi',
                    title: titleHi,
                    description: descriptionHi
                }
            ]
        };

        productData.append('productData', JSON.stringify(productInfo));
        storeImages.forEach((image) => {
            productData.append('images', image);
        });

        try {
            const response = await fetch(`${Config.apiUrl}${Config.endpoints.pujastore}`, {
                method: 'POST',
                body: productData,
            });

            const data = await response.json();

            if (data.status=='success') {
                alert('Product added successfully');
                setTitleEn('');
                setTitleHI('');
                setPrice('');
                setDiscount('');
                setDescriptionEn('');
                setDescriptionHi('');
                setStoreImages([]);
                setSelectedCategory('');

            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the product');
        }
    };

    const handleImageChange = (e) => {
        setStoreImages([...e.target.files]);
    };

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/api/categories/all');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="add-pooja-store">
            <h2>Add Store Product</h2>
            <form onSubmit={handleAddProduct}>
                <div className="form-group">
                    <label>Category:</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category._translations[0].name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>टाइटिल:</label>
                    <input type="text" value={titleHi} onChange={(e) => setTitleHI(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Discount: (%)</label>
                    <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <Editor data={descriptionEn} onChange={setDescriptionEn} />
                </div>

                <div className="form-group">
                    <label>विवरण:</label>
                    <Editor data={descriptionHi} onChange={setDescriptionHi} />
                </div>

                <div className="form-group">
                    <label>Upload Images:</label>
                    <input type="file" multiple onChange={handleImageChange} />
                </div>

                <button type="submit" className="btn btn-primary">Add Store Product</button>
            </form>
        </div>
    );
}

export default AddPoojaStore;
