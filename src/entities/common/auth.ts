import type { User } from "./user";

// Type for the authentication context
export interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    signup: (username: string, email: string, password: string) => Promise<boolean>;
    loading: boolean;
}