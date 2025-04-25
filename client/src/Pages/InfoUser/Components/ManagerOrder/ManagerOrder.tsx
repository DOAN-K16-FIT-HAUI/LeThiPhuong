import { Typography, Divider, Table, Button, Tag, Modal, Rate, message, Image, Descriptions, Input } from 'antd';
import { EyeOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';
import styles from './ManagerOrder.module.scss';
import { useEffect, useState } from 'react';
import {
    requestCancelPayment,
    requestCreateProductReview,
    requestGetPaymentByUserId,
} from '../../../../Config/request';

const cx = classNames.bind(styles);
const { Title, Text } = Typography;

interface Product {
    productDetails: {
        id: string;
        name: string;
        price: number;
        images: string;
    };
    quantity: number;
    productId: string;
    itemPrice: number;
}

interface Order {
    idPayment: string;
    fullName: string;
    address: string;
    phone: string;
    typePayment: string;
    status: string;
    note: string;
    createdAt: string;
    products: Product[];
    orderTotal: number;
}

function ManagerOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewProductId, setReviewProductId] = useState('');

    // Format date to dd/mm/yyyy
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${date.getFullYear()}`;
    };

    // Format price to Vietnamese currency
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    // Table columns
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'idPayment',
            key: 'idPayment',
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            render: (order: Order) => `${order.products.length} sản phẩm`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'blue';
                let text = status;

                switch (status) {
                    case 'pending':
                        color = 'orange';
                        text = 'Đang xử lý';
                        break;
                    case 'processing':
                        color = 'blue';
                        text = 'Đã xác nhận';
                        break;
                    case 'shipping':
                        color = 'cyan';
                        text = 'Đang giao';
                        break;
                    case 'completed':
                        color = 'green';
                        text = 'Đã giao';
                        break;
                    case 'cancelled':
                        color = 'red';
                        text = 'Đã hủy';
                        break;
                }

                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => formatDate(date),
        },
        {
            title: 'Tổng',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            render: (total: number) => formatPrice(total),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: Order) => (
                <Button
                    type="primary"
                    size="small"
                    icon={<EyeOutlined />}
                    className={cx('view-button')}
                    onClick={() => {
                        setSelectedOrder(record);
                        setIsModalVisible(true);
                    }}
                >
                    Xem
                </Button>
            ),
        },
    ];

    const handleCancelOrder = async (orderId: string) => {
        try {
            await requestCancelPayment(orderId);

            // For now, just update the local state
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order.idPayment === orderId ? { ...order, status: 'cancelled' } : order)),
            );

            setIsModalVisible(false);
            message.success('Đơn hàng đã được hủy thành công');
        } catch (error) {
            console.error('Failed to cancel order:', error);
            message.error('Không thể hủy đơn hàng');
        }
    };

    const openReviewModal = (productId: string) => {
        setReviewProductId(productId);
        setReviewRating(5);
        setReviewComment('');
        setIsReviewModalVisible(true);
    };

    const handleSubmitReview = async () => {
        try {
            // Implement API call to submit review
            // const res = await axios.post('/api/submit-review', {
            //     productId: reviewProductId,
            //     rating: reviewRating,
            //     comment: reviewComment
            // });

            await requestCreateProductReview({
                productId: reviewProductId,
                rating: reviewRating,
                comment: reviewComment,
            });

            setIsReviewModalVisible(false);
            message.success('Đánh giá của bạn đã được gửi thành công');
        } catch (error) {
            console.error('Failed to submit review:', error);
            message.error('Không thể gửi đánh giá');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await requestGetPaymentByUserId();
                setOrders(res.metadata);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                message.error('Đã có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={cx('purchased-products')}>
            <Title level={4} className={cx('section-title')}>
                Sản phẩm đã mua
            </Title>
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="idPayment"
                pagination={false}
                className={cx('products-table')}
                loading={loading}
            />

            {/* Order Details Modal */}
            <Modal
                title={`Chi tiết đơn hàng #${selectedOrder?.idPayment}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    selectedOrder?.status === 'pending' && (
                        <Button
                            key="cancel"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleCancelOrder(selectedOrder.idPayment)}
                        >
                            Hủy đơn hàng
                        </Button>
                    ),
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={800}
            >
                {selectedOrder && (
                    <div className={cx('order-details')}>
                        <Descriptions title="Thông tin đơn hàng" bordered column={2}>
                            <Descriptions.Item label="Tên người nhận">{selectedOrder.fullName}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">{selectedOrder.phone}</Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">{selectedOrder.address}</Descriptions.Item>
                            <Descriptions.Item label="Phương thức thanh toán">
                                {selectedOrder.typePayment}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày đặt hàng">
                                {formatDate(selectedOrder.createdAt)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                {selectedOrder.status === 'pending' && <Tag color="orange">Đang xử lý</Tag>}
                                {selectedOrder.status === 'processing' && <Tag color="blue">Đang giao</Tag>}
                                {selectedOrder.status === 'completed' && <Tag color="green">Đã giao</Tag>}
                                {selectedOrder.status === 'cancelled' && <Tag color="red">Đã hủy</Tag>}
                            </Descriptions.Item>
                            {selectedOrder.note && (
                                <Descriptions.Item label="Ghi chú" span={2}>
                                    {selectedOrder.note}
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        <Divider orientation="left">Sản phẩm</Divider>

                        {selectedOrder.products.map((product, index) => (
                            <div key={index} className={cx('product-item')}>
                                <div className={cx('product-details')}>
                                    <div className={cx('product-image')}>
                                        <Image
                                            width={100}
                                            src={`http://localhost:3000/uploads/images/${product.productDetails.images}`}
                                        />
                                    </div>
                                    <div className={cx('product-info')}>
                                        <Title level={5}>{product.productDetails.name}</Title>
                                        <Text>Số lượng: {product.quantity}</Text>
                                        <Text>Đơn giá: {formatPrice(product.productDetails.price)}</Text>
                                        <Text strong>Thành tiền: {formatPrice(product.itemPrice)}</Text>

                                        {selectedOrder.status === 'completed' && (
                                            <Button
                                                type="primary"
                                                icon={<StarOutlined />}
                                                className={cx('review-button')}
                                                onClick={() => openReviewModal(product.productId)}
                                            >
                                                Đánh giá
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                {index < selectedOrder.products.length - 1 && <Divider />}
                            </div>
                        ))}

                        <div className={cx('order-total')}>
                            <Title level={4}>Tổng cộng: {formatPrice(selectedOrder.orderTotal)}</Title>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Review Modal */}
            <Modal
                title="Đánh giá sản phẩm"
                open={isReviewModalVisible}
                onCancel={() => setIsReviewModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsReviewModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmitReview}>
                        Gửi đánh giá
                    </Button>,
                ]}
            >
                <div className={cx('review-form')}>
                    <div className={cx('rating-container')}>
                        <Text>Mức độ hài lòng của bạn:</Text>
                        <Rate allowHalf value={reviewRating} onChange={setReviewRating} />
                    </div>
                    <div className={cx('comment-container')}>
                        <Text>Nhận xét:</Text>
                        <Input.TextArea
                            rows={4}
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ManagerOrder;
