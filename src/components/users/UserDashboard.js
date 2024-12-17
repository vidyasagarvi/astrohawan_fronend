import { useEffect, useState } from 'react';
import axios from 'axios';
import Config from '../../config/Config';

function UserDashboard() {
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('User is not authenticated');
                }

                const response = await axios.get(`${Config.apiUrl}api/users/details`, {
                    headers: {
                        Authorization: token,
                    },
                });

                setUserDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch user details:', error);
                setError('Failed to fetch user details. Please try again.');
            }
        };

        fetchUserDetails();
    }, []); // Empty dependency array ensures this runs only once

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userDetails) {
        return <div>Loading...</div>; // Show a loading message until user details are fetched
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>
                Hello <b>{userDetails.name}</b>
            </p>
            <p>
                From your account dashboard you can view your recent orders, manage your
                shipping and billing addresses, and edit your password and account details.
            </p>
        </div>
    );
}

export default UserDashboard;
