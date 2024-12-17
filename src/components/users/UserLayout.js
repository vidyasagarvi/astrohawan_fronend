
import React from 'react';
import UserNavbar from './UserNavbar';

const Userayout = ({ children }) => {
    return (

        <div>
    
        <div className='cotainer py-5' style={{padding:"20px"}}>
            <div className="user-content">
            <UserNavbar />
            <div style={{marginTop:"20px"}}>
                {children}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Userayout;