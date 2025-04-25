import { useEffect, useState } from 'react';
import { Result, Button, Card, Typography, Descriptions, Table, Divider, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './PaymentSuccess.module.scss';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { requestGetPaymentById } from '../../Config/request';

const { Text } = Typography;
const cx = classNames.bind(styles);

interface PaymentItem {
    id: string;
    idPayment: string;
    userId: string;
    productId: string;
    quantity: number;
    fullName: string;
    address: string;
    phone: string;
    note: string;
    typePayment: 'cod' | 'vnpay' | 'momo';
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    createdAt: string;
    product: {
        id: string;
        name: string;
        price: number;
        images: string;
        [key: string]: any;
    };
    totalPrice: number;
}

function PaymentSuccess() {
    const [paymentItems, setPaymentItems] = useState<PaymentItem[]>([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        document.title = 'Thanh toán thành công';

        const fetchPaymentData = async () => {
            try {
                const res = await requestGetPaymentById(id || '');
                setPaymentItems(res.metadata);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, [id]);

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
            render: (_: any, record: PaymentItem) => (
                <div className={cx('product-item')}>
                    <div className={cx('product-image')}>
                        <img
                            src={`http://localhost:3000/uploads/images/${record.product.images}`}
                            alt={record.product.name}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/60x60?text=Eyeglasses';
                            }}
                        />
                    </div>
                    <div className={cx('product-info')}>
                        <Text>{record.product.name}</Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            key: 'price',
            render: (_: any, record: PaymentItem) => `${record.product.price.toLocaleString()}₫`,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Thành tiền',
            key: 'subtotal',
            render: (_: any, record: PaymentItem) => `${record.totalPrice.toLocaleString()}₫`,
        },
    ];

    const paymentMethodMap = {
        cod: 'Thanh toán khi nhận hàng',
        vnpay: 'VNPay',
        momo: 'MoMo',
    };

    const totalAmount = paymentItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const firstItem = paymentItems[0] || {};

    return (
        <div className={cx('payment-success')}>
            <header>
                <Header />
            </header>
            <main className={cx('success-container')}>
                <Result
                    status="success"
                    icon={<CheckCircleOutlined className={cx('success-icon')} />}
                    title="Thanh toán thành công!"
                    subTitle={`Mã đơn hàng: ${firstItem.idPayment || 'Đang tải...'}`}
                    extra={[
                        <Button type="primary" key="continue" className={cx('continue-btn')}>
                            <Link to="/">Tiếp tục mua sắm</Link>
                        </Button>,
                    ]}
                />

                <Row gutter={[32, 32]} className={cx('detail-section')}>
                    <Col xs={24} lg={12}>
                        <Card title="Thông tin đơn hàng" bordered={false} className={cx('info-card')}>
                            {loading ? (
                                <p>Đang tải thông tin...</p>
                            ) : (
                                <Descriptions column={1}>
                                    <Descriptions.Item label="Tên khách hàng">{firstItem.fullName}</Descriptions.Item>
                                    <Descriptions.Item label="Địa chỉ">{firstItem.address}</Descriptions.Item>
                                    <Descriptions.Item label="Số điện thoại">{firstItem.phone}</Descriptions.Item>
                                    <Descriptions.Item label="Phương thức thanh toán">
                                        {firstItem.typePayment ? paymentMethodMap[firstItem.typePayment] : ''}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Thời gian đặt hàng">
                                        {firstItem.createdAt
                                            ? new Date(firstItem.createdAt).toLocaleString('vi-VN')
                                            : ''}
                                    </Descriptions.Item>
                                    {firstItem.note && (
                                        <Descriptions.Item label="Ghi chú">{firstItem.note}</Descriptions.Item>
                                    )}
                                </Descriptions>
                            )}
                        </Card>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Card title="Tổng thanh toán" bordered={false} className={cx('total-card')}>
                            {loading ? (
                                <p>Đang tải thông tin...</p>
                            ) : (
                                <>
                                    <div className={cx('order-summary')}>
                                        <div className={cx('summary-row')}>
                                            <Text>Tạm tính</Text>
                                            <Text>{totalAmount.toLocaleString()}₫</Text>
                                        </div>
                                        <div className={cx('summary-row')}>
                                            <Text>Phí vận chuyển</Text>
                                            <Text>0₫</Text>
                                        </div>
                                        <Divider style={{ margin: '12px 0' }} />
                                        <div className={cx('summary-row', 'total')}>
                                            <Text strong>Tổng cộng</Text>
                                            <Text strong className={cx('total-amount')}>
                                                {totalAmount.toLocaleString()}₫
                                            </Text>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>

                <Card
                    style={{ marginTop: '20px' }}
                    title="Chi tiết sản phẩm"
                    bordered={false}
                    className={cx('products-card')}
                >
                    {loading ? (
                        <p>Đang tải thông tin sản phẩm...</p>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={paymentItems}
                            pagination={false}
                            rowKey="id"
                            className={cx('products-table')}
                        />
                    )}
                </Card>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default PaymentSuccess;
