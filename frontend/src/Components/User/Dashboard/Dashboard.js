import React from 'react';
import { useNavigate } from 'react-router-dom';

// Dashboard component
function Dashboard() {

    const navigate = useNavigate();

    return (
        <div>
            {/* Logout Button - Removes token and redirects to login */}
            <button onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
            }}>
                Logout
            </button>

            <h1>Welcome to the Dashboard</h1>

        </div>
    );
}

export default Dashboard;
