import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ManagerCustomer.module.scss';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { useStore } from '../../../../hooks/useStore';
import { requestUpdateInfo } from '../../../../Config/request';

const cx = classNames.bind(styles);

function ManagerCustomer() {
    const [form] = Form.useForm();

    const { dataUser, fetchAuth } = useStore() as any;

    useEffect(() => {
        // Set initial form values when dataUser changes
        if (dataUser) {
            form.setFieldsValue({
                fullName: dataUser.fullName,
                email: dataUser.email,
            });
        }
    }, [dataUser, form]);

    const onFinish = async (values: any) => {
        try {
            const res = await requestUpdateInfo(values);
            form.setFieldsValue({
                newPassword: '',
                confirmPassword: '',
                currentPassword: '',
            });
            await fetchAuth();
            message.success(res.message);
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('manager-customer')}>
            <h2 className={cx('title')}>Thông tin tài khoản</h2>

            <Row gutter={24}>
                <Col xs={24} md={24}>
                    <Form form={form} layout="vertical" name="userInfoForm" onFinish={onFinish} className={cx('form')}>
                        <Form.Item
                            label="Tên người dùng"
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                        >
                            <Input placeholder="Tên người dùng" className={cx('input')} />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập địa chỉ email!' },
                                { type: 'email', message: 'Email không hợp lệ!' },
                            ]}
                        >
                            <Input placeholder="Địa chỉ email" className={cx('input')} />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu hiện tại"
                            name="currentPassword"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                            ]}
                        >
                            <Input.Password placeholder="Mật khẩu hiện tại" className={cx('input')} />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                            ]}
                        >
                            <Input.Password placeholder="Mật khẩu mới" className={cx('input')} />
                        </Form.Item>

                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                            ]}
                        >
                            <Input.Password placeholder="Nhập lại mật khẩu" className={cx('input')} />
                        </Form.Item>

                        <Form.Item className={cx('buttons')}>
                            <Button type="primary" htmlType="submit" className={cx('submit-btn')}>
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default ManagerCustomer;
