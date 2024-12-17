import React, { useEffect, useState } from 'react';

function PoojaStore() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://127.0.0.1:3000/api/categories', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const data = await response.json();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        const response = await fetch(`http://127.0.0.1:3000/api/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        if (response.ok) {
            setCategories(categories.filter(category => category.id !== categoryId));
        } else {
            alert('Failed to delete category');
        }
    };

    return (
        <div>
            <h2>Category List</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        {category.name}
                        <button onClick={() => handleDelete(category.id)}>Delete</button>
                        <button>Edit</button> {/* You can link this button to an edit form */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PoojaStore;
