import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import styles from './CartUser.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, InputNumber, Button, Card, Divider, Space, Typography, Image, message } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useStore } from '../../hooks/useStore';
import { requestChangeQuantity, requestClearProductCart } from '../../Config/request';

const { Title, Text, Paragraph } = Typography;
const cx = classNames.bind(styles);

function CartUser() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const handleSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const { dataCart, fetchCart } = useStore() as { dataCart?: any[]; fetchCart: () => void };

    const totalPrice = dataCart?.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleQuantityChange = async (key: string, value: number | null) => {
        setQuantities((prev) => ({
            ...prev,
            [key]: value || 0,
        }));

        const data = {
            productId: key,
            quantity: value || 0,
        };
        await requestChangeQuantity(data);
        await fetchCart();
    };

    useEffect(() => {
        document.title = 'Giỏ hàng';
    }, []);

    const columns = [
        {
            title: 'Thông tin sản phẩm',
            key: 'info',
            render: (_: any, record: any) => (
                <div className={cx('productInfo')}>
                    <Image
                        src={`http://localhost:3000/uploads/images/${record.images}`}
                        alt={record.name}
                        width={100}
                        height={100}
                        preview={false}
                        className={cx('productImage')}
                    />
                    <div className={cx('productDetails')}>
                        <Text strong>{record.name}</Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Giá',
            key: 'price',
            align: 'center' as const,
            render: (_: any, record: any) => <Text>{record.price.toLocaleString('vi-VN')}đ</Text>,
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            align: 'center' as const,
            render: (_: any, record: any) => (
                <InputNumber
                    min={1}
                    max={record.stock}
                    value={quantities[record.key] ?? record.quantity} // Sửa chỗ này
                    onChange={(value) => handleQuantityChange(record.key, value)}
                    className={cx('quantityInput')}
                />
            ),
        },
        {
            title: 'Còn lại',
            key: 'stock',
            align: 'center' as const,
            render: (_: any, record: any) => <Text>{record.stock} sản phẩm</Text>,
        },
        {
            title: 'Tổng cộng',
            key: 'total',
            align: 'center' as const,
            render: (_: any, record: any) => {
                const qty = record.quantity || 1;
                const total = qty * record.price;
                return <Text strong>{total.toLocaleString()}đ</Text>;
            },
        },
    ];

    const dataSource =
        dataCart?.map((item, index) => ({
            key: String(item.id || index),
            name: item.name || 'KR. KÍNH RÂM THỜI TRANG P9141',
            color: item.color,
            images: item.images,
            price: item.price,
            stock: item.stock,
            quantity: item.quantity,
        })) || [];

    const rowSelection = {
        selectedRowKeys,
        onChange: handleSelectChange,
    };

    const handleClearProduct = async () => {
        const data = {
            productId: selectedRowKeys,
        };
        try {
            await requestClearProductCart(data);
            await fetchCart();
            message.success('Xoá thành công');
        } catch (error) {
            message.error('Xoá không thành công');
        }
    };

    return (
        <div className={cx('cartPage')}>
            <header>
                <Header />
            </header>

            <main className={cx('cartContainer')}>
                <Title level={2} className={cx('pageTitle')}>
                    Sản Phẩm
                </Title>

                <div className={cx('cartContent')}>
                    <div className={cx('tableContainer')}>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={dataSource}
                            pagination={false}
                            className={cx('productTable')}
                        />

                        <div className={cx('cartActions')}>
                            <Button
                                icon={<DeleteOutlined />}
                                className={cx('removeButton')}
                                disabled={selectedRowKeys.length === 0}
                                onClick={handleClearProduct}
                            >
                                Xóa sản phẩm đã chọn
                            </Button>
                        </div>
                    </div>

                    <div className={cx('cartSummary')}>
                        <Card className={cx('summaryBox')}>
                            <Title level={4} className={cx('summaryTitle')}>
                                Tóm tắt đơn hàng
                            </Title>
                            <Divider />
                            <div className={cx('summaryRow')}>
                                <Text>Tạm tính</Text>
                                <Text>{totalPrice.toLocaleString()}đ</Text>
                            </div>
                            <Divider />
                            <div className={cx('summaryTotal')}>
                                <Text strong>Tổng</Text>
                                <Text strong>{totalPrice.toLocaleString()}đ</Text>
                            </div>
                            <Link to="/checkout">
                                <Button type="primary" block size="large" className={cx('checkoutButton')}>
                                    Thanh toán ngay
                                </Button>
                            </Link>
                        </Card>

                        <div className={cx('paymentInfo')}>
                            <Paragraph className={cx('paymentText')}>Chúng tôi chấp nhận thanh toán</Paragraph>
                            <Space className={cx('paymentMethods')}>
                                <img
                                    src="https://kinhmatanna.com/_next/image?url=%2Fimg%2Fcart%2Fvisa.png&w=640&q=75"
                                    alt="Visa"
                                />
                                <img
                                    src="https://kinhmatanna.com/_next/image?url=%2Fimg%2Fcart%2Famex.png&w=640&q=75"
                                    alt="American Express"
                                />
                                <img
                                    src="https://kinhmatanna.com/_next/image?url=%2Fimg%2Fcart%2Fdiscover.png&w=640&q=75"
                                    alt="Discover"
                                />
                                <img
                                    src="https://kinhmatanna.com/_next/image?url=%2Fimg%2Fcart%2Fmastercard.png&w=3840&q=80"
                                    alt="Mastercard"
                                />
                            </Space>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default CartUser;
