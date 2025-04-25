import App from '../App';
import LoginUser from '../Pages/LoginUser/LoginUser';
import RegisterUser from '../Pages/RegisterUser/RegisterUser';
import DetailProduct from '../Pages/DetailProduct/DetailProduct';
import CartUser from '../Pages/CartUser/CartUser';
import CheckOut from '../Pages/CheckOut/CheckOut';
import PaymentSuccess from '../Pages/PaymentSuccess/PaymentSuccess';
import InfoUser from '../Pages/InfoUser/InfoUser';
import Category from '../Pages/Category/Category';
import DashBroad from '../Pages/DashBroad/DashBroad';
export const publicRoutes = [
    { path: '/', component: <App /> },
    { path: '/login', component: <LoginUser /> },
    { path: '/register', component: <RegisterUser /> },
    { path: '/product/:id', component: <DetailProduct /> },
    { path: '/cart', component: <CartUser /> },
    { path: '/checkout', component: <CheckOut /> },
    { path: '/payments/:id', component: <PaymentSuccess /> },
    { path: '/profile', component: <InfoUser /> },
    { path: '/category/:id', component: <Category /> },
    { path: '/orders', component: <InfoUser /> },
    { path: '/admin', component: <DashBroad /> },
];
