import React, { useState } from 'react';
import supabase from '../tools/SupabaseClient';


const DeleteUserBtn = ({ userId, userName }) => {
    const [flashMessage, setFlashMessage] = useState('');

    const handleDeleteUser = async () => {
        try {
            const { data, error } = await supabase.from('users').delete().eq('id', userId);
            if (error) {
                console.error('Error deleting user:', error);
                setFlashMessage('Error deleting user. Please try again.');
            } else {
                setFlashMessage('User deleted successfully!');
            }
        } catch (error) {
            console.error('Error during user deletion:', error);
            setFlashMessage('Error during user deletion. Please try again.');
        }
    };

    return (
        <div>
            {flashMessage && <div className="output-message">{flashMessage}</div>}
            <div>
                <p>{`Are you sure you want to delete user ${userName}?`}</p>
                <button onClick={handleDeleteUser}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteUserBtn;
