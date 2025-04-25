import axios from 'axios';

import cookies from 'js-cookie';

const request = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export const requestRegister = async (data: any) => {
    const res = await request.post('/api/register', data);
    return res.data;
};

export const requestLogin = async (data: any) => {
    const res = await request.post('/api/login', data);
    return res.data;
};

export const requestAuth = async () => {
    const res = await request.get('/api/auth');
    return res.data;
};

export const requestRefreshToken = async () => {
    const res = await request.get('/api/refresh-token');
    return res.data;
};

export const requestLogout = async () => {
    const res = await request.get('/api/logout');
    return res.data;
};

export const requestUpdateInfo = async (data: any) => {
    const res = await request.post('/api/update-info', data);
    return res.data;
};

////category

export const requestCreateCategory = async (data: any) => {
    const res = await request.post('/api/create-category', data);
    return res.data;
};

export const requestGetCategory = async () => {
    const res = await request.get('/api/category');
    return res.data;
};

export const requestGetCategoryById = async (id: string) => {
    const res = await request.get('/api/category-by-id', {
        params: { id },
    });
    return res.data;
};

export const requestEditCategory = async (data: any) => {
    const res = await request.post('/api/edit-category', data);
    return res.data;
};

export const requestDeleteCategory = async (idCategory: string) => {
    const res = await request.delete('/api/delete-category', {
        params: { idCategory },
    });
    return res.data;
};

/// product

export const requestGetProductById = async (id: string) => {
    const res = await request.get('/api/product', {
        params: { id },
    });
    return res.data;
};

export const requestSearchProduct = async (search: string) => {
    const res = await request.get('/api/search-product', {
        params: { search },
    });
    return res.data;
};

export const requestCreateProduct = async (formData: FormData) => {
    const res = await request.post('/api/create-product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const requestEditProduct = async (id: string, formData: FormData) => {
    const res = await request.put('/api/edit-product', formData, {
        params: { id },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const requestDeleteProduct = async (id: string) => {
    const res = await request.delete('/api/delete-product', {
        params: { id },
    });
    return res.data;
};

//// cart
export const requestAddCart = async (data: any) => {
    const res = await request.post('/api/add-to-cart', data);
    return res.data;
};

export const requestGetCart = async () => {
    const res = await request.get('/api/cart');
    return res.data;
};

export const requestChangeQuantity = async (data: any) => {
    const res = await request.post('/api/change-quantity', data);
    return res.data;
};

export const requestClearProductCart = async (data: any) => {
    const res = await request.post('/api/clear-product', data);
    return res.data;
};

export const requestUpdateInfoCart = async (data: any) => {
    const res = await request.post('/api/update-info-cart', data);
    return res.data;
};

/// payment

export const requestPayment = async (data: any) => {
    const res = await request.post('/api/payment', data);
    return res.data;
};

export const requestGetPaymentById = async (id: string) => {
    const res = await request.get('/api/payment', {
        params: { id },
    });
    return res.data;
};

export const requestGetPaymentByUserId = async () => {
    const res = await request.get('/api/payment-by-user');
    return res.data;
};

export const requestCancelPayment = async (idPayment: string) => {
    const res = await request.post('/api/cancel-payment', { idPayment });
    return res.data;
};

export const requestGetPaymentByAdmin = async () => {
    const res = await request.get('/api/payment-by-admin');
    return res.data;
};

export const requestUpdateStatusPayment = async (data: any) => {
    const res = await request.post('/api/update-status-payment', data);
    return res.data;
};

export const requestGetAllUser = async () => {
    const res = await request.get('/api/get-all-user');
    return res.data;
};

export const requestUpdateUser = async (data: any) => {
    const res = await request.post('/api/update-user', data);
    return res.data;
};

export const requestStatistics = async () => {
    const res = await request.get('/api/statistics');
    return res.data;
};

/// product review

export const requestCreateProductReview = async (data: any) => {
    const res = await request.post('/api/product-review', data);
    return res.data;
};

export const requestGetAdmin = async () => {
    const res = await request.get('/admin');
    return res.data;
};

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

request.interceptors.response.use(
    (response) => response, // Trả về nếu không có lỗi
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 (Unauthorized) và request chưa từng thử refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    // Gửi yêu cầu refresh token
                    const token = cookies.get('logged');
                    if (!token) {
                        return;
                    }
                    await requestRefreshToken();

                    // Xử lý lại tất cả các request bị lỗi 401 trước đó
                    failedRequestsQueue.forEach((req) => req.resolve());
                    failedRequestsQueue = [];
                } catch (refreshError) {
                    // Nếu refresh thất bại, đăng xuất
                    failedRequestsQueue.forEach((req) => req.reject(refreshError));
                    failedRequestsQueue = [];
                    localStorage.clear();
                    window.location.href = '/login'; // Chuyển về trang đăng nhập
                } finally {
                    isRefreshing = false;
                }
            }

            // Trả về một Promise để retry request sau khi token mới được cập nhật
            return new Promise((resolve, reject) => {
                failedRequestsQueue.push({
                    resolve: () => {
                        resolve(request(originalRequest));
                    },
                    reject: (err: any) => reject(err),
                });
            });
        }

        return Promise.reject(error);
    },
);
