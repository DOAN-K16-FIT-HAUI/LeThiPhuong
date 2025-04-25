import Context from './Context';
import CryptoJS from 'crypto-js';

import cookies from 'js-cookie';

import { useEffect, useState } from 'react';
import { requestAuth, requestGetCart, requestGetCategory } from '../Config/request';

export function Provider({ children }: { children: React.ReactNode }) {
    const [dataUser, setDataUser] = useState({});

    const [category, setCategory] = useState([]);

    const [dataCart, setDataCart] = useState([]);

    const fetchAuth = async () => {
        try {
            const res = await requestAuth();
            const bytes = CryptoJS.AES.decrypt(res.metadata, import.meta.env.VITE_SECRET_CRYPTO);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (!originalText) {
                console.error('Failed to decrypt data');
                return;
            }
            const user = JSON.parse(originalText);
            setDataUser(user);
        } catch (error) {
            console.error('Auth error:', error);
        }
    };

    const fetchCart = async () => {
        const res = await requestGetCart();
        setDataCart(res.metadata);
    };

    const fetchCategory = async () => {
        try {
            const res = await requestGetCategory();
            setCategory(res.metadata);
        } catch (error) {
            console.error('Auth error:', error);
        }
    };

    useEffect(() => {
        const token = cookies.get('logged');
        fetchCategory();
        if (!token) {
            return;
        }
        fetchAuth();
        fetchCart();
    }, []);

    return (
        <Context.Provider
            value={{
                dataUser,
                setDataUser,
                fetchAuth,
                category,
                dataCart,
                fetchCart,
            }}
        >
            {children}
        </Context.Provider>
    );
}
