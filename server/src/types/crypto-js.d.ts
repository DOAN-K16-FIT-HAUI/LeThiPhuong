declare module 'crypto-js' {
    namespace AES {
        function encrypt(message: string, secretKey: string): { toString(): string };
        function decrypt(ciphertext: string, secretKey: string): { toString(): string };
    }
}
