import { createContext } from 'react';

// Define the shape of your context data
interface ContextType {
    dataUser?: {
        id?: string;
        fullName?: string;
        email?: string;
        isAdmin?: boolean;
    };
    dataCart?: any[];
    setDataUser?: (data: any) => void;
    fetchAuth?: () => void;
    fetchCart?: () => void;

    category?: any[];
}

const Context = createContext<ContextType>({});

export default Context;
