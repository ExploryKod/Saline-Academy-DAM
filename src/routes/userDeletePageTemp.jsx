import React from 'react';
import DeleteUserBtn from '../component/deleteUserBtn.jsx';
import { useParams } from 'react-router-dom';

const UserDeletePage = () => {
    // Example user ID and name
    const { userId, lastname } = useParams();


    return (
        <div className="user-delete-page">
            <h1>User Deletion</h1>
            <DeleteUserBtn  userId={userId} userName={userName}  />
        </div>
    );
};

export default UserDeletePage;
