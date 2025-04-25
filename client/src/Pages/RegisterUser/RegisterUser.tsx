import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './RegisterUser.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { requestRegister } from '../../Config/request';

import { message } from 'antd';

const cx = classNames.bind(styles);

function RegisterUser() {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const data = {
            fullName: values.username,
            email: values.email,
            password: values.password,
        };
        try {
            await requestRegister(data);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            navigate('/');
            message.success('Đăng ký thành công');
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    };

    useEffect(() => {
        document.title = 'Đăng ký';
    }, []);

    return (
        <div className={cx('login-user')}>
            <header>
                <Header />
            </header>
            <div className={cx('container')}>
                <div className={cx('image-container')}>
                    <img
                        src="https://kinhmatanna.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg-register.a5755907.jpg&w=640&q=80"
                        alt=""
                    />
                </div>
                <div className={cx('form-container')}>
                    <div className={cx('form-header')}>
                        <h1>Đăng ký</h1>
                        <p>Hãy đăng ký để được hưởng nhiều đặc quyền riêng dành cho bạn</p>
                    </div>
                    <Form
                        form={form}
                        name="register_form"
                        className={cx('login-form')}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="username"
                            label={
                                <span>
                                    TÀI KHOẢN <span className={cx('required')}>*</span>
                                </span>
                            }
                            rules={[
                                { required: true, message: 'Vui lòng nhập tài khoản!' },
                                { min: 3, message: 'Tài khoản phải có ít nhất 3 ký tự!' },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Nhập tài khoản" size="large" />
                        </Form.Item>
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
                                Đăng ký ngay
                            </Button>
                        </Form.Item>

                        <div className={cx('login-link')}>
                            <p>
                                Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
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

export default RegisterUser;
