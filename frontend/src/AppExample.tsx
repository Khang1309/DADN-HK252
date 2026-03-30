import React, { useEffect } from 'react';
import { useAuthStore } from './store/useUserStore';
import LoginForm from './components/LoginForm';
import RoomManager from './components/RoomManager';

function App() {
    const { user, checkAuth } = useAuthStore();

    useEffect(() => {
        // Check if user is already logged in on app start
        checkAuth();
    }, [checkAuth]);

    return (
        <div className="App">
            <h1>Smart Home Dashboard</h1>

            {!user ? (
                <LoginForm />
            ) : (
                <RoomManager />
            )}
        </div>
    );
}

export default App;