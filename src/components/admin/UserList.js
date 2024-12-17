import React, { useEffect, useState } from 'react';

function AdminUserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://127.0.0.1:3000/api/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const response = await fetch(`http://127.0.0.1:3000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        if (response.ok) {
            setUsers(users.filter(user => user.id !== userId));
        } else {
            alert('Failed to delete user');
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminUserList;
