import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './LoginUser.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { requestLogin } from '../../Config/request';

const cx = classNames.bind(styles);

function LoginUser() {
    const [form] = Form.useForm();

    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            const data = {
                email: values.email,
                password: values.password,
            };
            await requestLogin(data);
            setTimeout(() => {
                window.location.reload();
            }, 1000);

            navigate('/');
        } catch (error: any) {
            message.error('Tài khoản hoặc mật khẩu không chính xác');
        }
    };

    return (
        <div className={cx('login-user')}>
            <header>
                <Header />
            </header>
            <div className={cx('container')}>
                <div className={cx('image-container')}>
                    <img
                        src="https://kinhmatanna.com/_next/image?url=%2Fimg%2Flogin%2Fimg-login.jpg&w=640&q=80"
                        alt=""
                    />
                </div>
                <div className={cx('form-container')}>
                    <div className={cx('form-header')}>
                        <h1>Đăng nhập</h1>
                        <p>Hãy đăng nhập để được hưởng đặc quyền riêng dành cho bạn</p>
                    </div>
                    <Form
                        form={form}
                        name="login_form"
                        className={cx('login-form')}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            label={
                                <span>
                                    EMAIL <span className={cx('required')}>*</span>
                                </span>
                            }
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Nhập email" size="large" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={
                                <span>
                                    MẬT KHẨU <span className={cx('required')}>*</span>
                                </span>
                            }
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" size="large" />
                        </Form.Item>

                        <div className={cx('privacy-note')}>
                            <p>
                                Thông tin của bạn sẽ được bảo mật theo <a href="#">chính sách riêng tư</a> của chúng tôi
                            </p>
                        </div>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={cx('register-btn')} size="large" block>
                                Đăng nhập
                            </Button>
                        </Form.Item>

                        <div className={cx('login-link')}>
                            <p>
                                Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default LoginUser;
