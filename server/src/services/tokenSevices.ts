import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import modelApiKey from '../models/apiKey.model';
import { BadUserRequestError } from '../core/error.response';
import { jwtDecode } from 'jwt-decode';

require('dotenv').config();

interface ApiKey {
    publicKey: string;
    privateKey: string;
}

const createApiKey = async (userId: string) => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });

    const privateKeyString = privateKey.export({ type: 'pkcs8', format: 'pem' });
    const publicKeyString = publicKey.export({ type: 'spki', format: 'pem' });

    const newApiKey = new modelApiKey({
        userId,
        publicKey: publicKeyString,
        privateKey: privateKeyString,
    }) as unknown as ApiKey;
    return (await newApiKey.save()) as unknown as ApiKey;
};

const createToken = async (payload: any) => {
    const findApiKey = await modelApiKey.findOne({ userId: payload.id.toString() });

    if (!findApiKey?.privateKey) {
        throw new Error('Private key not found for user');
    }

    return jwt.sign(payload, findApiKey.privateKey, {
        algorithm: 'RS256', // Quan trọng: Phải chỉ định thuật toán khi dùng RSA
        expiresIn: '15m',
    });
};

const createRefreshToken = async (payload: any) => {
    const findApiKey = await modelApiKey.findOne({ userId: payload.id.toString() });

    if (!findApiKey?.privateKey) {
        throw new Error('Private key not found for user');
    }

    return jwt.sign(payload, findApiKey.privateKey, {
        algorithm: 'RS256',
        expiresIn: '7d',
    });
};

const verifyToken = async (token: string) => {
    try {
        const { id } = jwtDecode(token);
        const findApiKey = await modelApiKey.findOne({ userId: id });

        if (!findApiKey) {
            throw new BadUserRequestError('Vui lòng đăng nhập lại');
        }

        return jwt.verify(token, findApiKey.publicKey, {
            algorithms: ['RS256'],
        });
    } catch (error) {
        throw new BadUserRequestError('Vui lòng đăng nhập lại');
    }
};

export { createApiKey, createToken, createRefreshToken, verifyToken };
