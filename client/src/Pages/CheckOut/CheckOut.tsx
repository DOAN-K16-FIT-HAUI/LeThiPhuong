import { useEffect } from 'react';
import { Form, Input, Button, Radio, Row, Col, Typography, Space, Divider, AutoComplete } from 'antd';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './CheckOut.scss';
import { useStore } from '../../hooks/useStore';
import { requestPayment, requestUpdateInfoCart } from '../../Config/request';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function CheckOut() {
    useEffect(() => {
        document.title = 'Thanh toán';
    }, []);

    // For demo purposes only, would typically come from an API or database
    const addressOptions = [
        { value: 'Hà Nội, Quận Ba Đình' },
        { value: 'Hà Nội, Quận Hoàn Kiếm' },
        { value: 'Hà Nội, Quận Tây Hồ' },
        { value: 'TP.HCM, Quận 1' },
        { value: 'TP.HCM, Quận 3' },
        { value: 'TP.HCM, Quận 7' },
    ];

    const { dataCart } = useStore() as { dataCart: any[] };

    const totalPrice = dataCart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const navigate = useNavigate();
    const handleSubmit = async (values: any) => {
        const dataInfo = {
            fullName: values.fullName,
            address: values.address,
            phone: values.phone,
            note: values.additionalInfo,
        };
        await requestUpdateInfoCart(dataInfo);
        const dataPayment = {
            typePayment: values.paymentMethod,
        };
        if (values.paymentMethod === 'cod') {
            const res = await requestPayment(dataPayment);
            navigate(`/payments/${res.metadata}`);
        }
        if (values.paymentMethod === 'vnpay') {
            const res = await requestPayment(dataPayment);
            window.open(res.metadata, '_blank');
        }
        if (values.paymentMethod === 'momo') {
            const res = await requestPayment(dataPayment);
            window.open(res.metadata.payUrl, '_blank');
        }
    };

    return (
        <div className="checkout-page">
            <header>
                <Header />
            </header>

            <main className="checkout-container">
                <Row gutter={[32, 0]}>
                    <Col xs={24} md={14}>
                        <div className="checkout-form">
                            <Title level={3}>THANH TOÁN</Title>
                            <Form layout="vertical" onFinish={handleSubmit}>
                                <Form.Item
                                    label="Họ và tên :"
                                    name="fullName"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                                >
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>

                                <Form.Item
                                    label="Số điện thoại :"
                                    name="phone"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                >
                                    <Input placeholder="Số điện thoại" />
                                </Form.Item>

                                <Form.Item
                                    label="Email :"
                                    name="email"
                                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>

                                <Form.Item
                                    label="Địa chỉ :"
                                    name="address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                                >
                                    <AutoComplete
                                        options={addressOptions}
                                        placeholder="Nhập địa chỉ"
                                        filterOption={(inputValue, option) =>
                                            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                </Form.Item>

                                <Form.Item label="Thông tin bổ sung :" name="additionalInfo">
                                    <Input.TextArea rows={4} placeholder="Thông tin bổ sung" />
                                </Form.Item>

                                <Divider />

                                <Title level={5}>Phương thức thanh toán</Title>
                                <Form.Item
                                    name="paymentMethod"
                                    rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                                >
                                    <Radio.Group>
                                        <div className="payment-methods">
                                            <div className="payment-method-item">
                                                <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                                            </div>
                                            <div className="payment-method-item">
                                                <Radio value="vnpay">
                                                    <div className="payment-logo-wrapper">
                                                        <img
                                                            src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
                                                            alt="VNPAY"
                                                            className="payment-logo"
                                                        />
                                                        <span>VNPAY</span>
                                                    </div>
                                                </Radio>
                                            </div>
                                            <div className="payment-method-item">
                                                <Radio value="momo">
                                                    <div className="payment-logo-wrapper">
                                                        <img
                                                            src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                                                            alt="MOMO"
                                                            className="payment-logo"
                                                        />
                                                        <span>MOMO</span>
                                                    </div>
                                                </Radio>
                                            </div>
                                        </div>
                                    </Radio.Group>
                                </Form.Item>

                                <Text className="policy-text">
                                    Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng và cho các mục đích cụ
                                    thể khác đã được mô tả trong chính sách riêng tư của chúng tôi.
                                </Text>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="order-button">
                                        Đặt hàng
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>

                    <Col xs={24} md={10}>
                        <div className="order-summary">
                            <div className="product-section">
                                <Title level={5}>Sản phẩm</Title>
                                {dataCart.map((item) => (
                                    <div className="product-item">
                                        <div className="product-image">
                                            <img
                                                src={`http://localhost:3000/uploads/images/${item.images}`}
                                                alt="Product"
                                            />
                                        </div>
                                        <div className="product-info">
                                            <Text>{item.name}</Text>
                                        </div>
                                        <div className="product-quantity">
                                            <Text>x{item.quantity}</Text>
                                        </div>
                                        <div className="product-price">
                                            <Text>{item.price.toLocaleString()}₫</Text>
                                        </div>
                                    </div>
                                ))}

                                <Divider style={{ margin: '12px 0' }} />

                                <div className="order-details">
                                    <div className="detail-row">
                                        <Text>Tạm tính</Text>
                                        <Text className="amount">{totalPrice.toLocaleString()}₫</Text>
                                    </div>

                                    <Divider style={{ margin: '12px 0' }} />
                                    <div className="detail-row total">
                                        <Text strong>Tổng cộng</Text>
                                        <Text className="amount" strong>
                                            {totalPrice.toLocaleString()}₫
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default CheckOut;
