import type { AuthContextType } from '@/entities/common/auth';
import type { User } from '@/entities/common/user';
import React, { createContext, useState, useEffect, type ReactNode } from 'react';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
            setUser({ id: 'user123', name: 'Business Owner' });
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email === 'test@example.com' && password === '1234') {
                    localStorage.setItem('authToken', 'mock_jwt_token');
                    setIsLoggedIn(true);
                    setUser({ id: 'user123', name: 'Business Owner' });
                    resolve(true);
                } else {
                    resolve(false);
                }
                setLoading(false);
            }, 1000);
        });
    };

    const logout = (): void => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUser(null);
    };

    const signup = async (username: string, email: string, password: string): Promise<boolean> => {
        setLoading(true);
        return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Simulating signup:', { username, email, password });
            resolve(true);
            setLoading(false);
        }, 1500);
        });
    };

    const contextValue: AuthContextType = {
        isLoggedIn,
        user,
        login,
        logout,
        signup,
        loading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};