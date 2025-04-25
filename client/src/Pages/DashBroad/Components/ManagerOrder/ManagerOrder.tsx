import { useState, useEffect } from 'react';
import { Table, Tag, Space, Input, Select, Button, Modal, Form, Descriptions, message, List, Card } from 'antd';
import { SearchOutlined, FilterOutlined, EyeOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ManagerOrder.module.scss';
import { requestGetPaymentByAdmin, requestUpdateStatusPayment } from '../../../../Config/request';

const cx = classNames.bind(styles);
const { Option } = Select;

// Updated interface for product item in an order
interface ProductItem {
    productDetails: {
        id: string;
        name: string;
        price: number;
        images?: string;
        thumbnail?: string;
    };
    quantity: number;
    productId: string;
    itemPrice: number;
}

// Updated Order interface for grouped orders
interface Order {
    idPayment: string;
    userId: string;
    fullName: string;
    address: string;
    phone: string;
    note: string;
    typePayment: 'cod' | 'vnpay' | 'momo';
    status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'shipping';
    createdAt: string;
    products: ProductItem[];
    orderTotal: number;
}

function ManagerOrder() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await requestGetPaymentByAdmin();
            setOrders(response.metadata);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            message.error('Không thể tải danh sách đơn hàng');
            setLoading(false);
        }
    };

    const handleViewOrder = (order: Order): void => {
        setCurrentOrder(order);
        setIsModalOpen(true);
    };

    const handleUpdateStatus = async (idPayment: string, newStatus: Order['status']): Promise<void> => {
        try {
            // Update API endpoint to update by idPayment instead of id
            await requestUpdateStatusPayment({ idPayment, status: newStatus });
            message.success('Cập nhật trạng thái đơn hàng thành công');
            fetchOrders();
        } catch (error) {
            console.error('Failed to update order status:', error);
            message.error('Không thể cập nhật trạng thái đơn hàng');
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchText(e.target.value);
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.idPayment.toLowerCase().includes(searchText.toLowerCase()) ||
            (order.fullName?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
            (order.phone || '').includes(searchText);

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: Order['status']): string => {
        switch (status) {
            case 'pending':
                return 'gold';
            case 'processing':
                return 'blue';
            case 'completed':
                return 'green';
            case 'cancelled':
                return 'red';
            case 'shipping':
                return 'cyan';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: Order['status']): string => {
        switch (status) {
            case 'pending':
                return 'CHỜ XỬ LÝ';
            case 'processing':
                return 'ĐANG XỬ LÝ';
            case 'completed':
                return 'HOÀN THÀNH';
            case 'cancelled':
                return 'ĐÃ HỦY';
            case 'shipping':
                return 'ĐANG GIAO';
            default:
                return String(status);
        }
    };

    const getPaymentTypeText = (type: Order['typePayment']): string => {
        switch (type) {
            case 'cod':
                return 'Thanh toán khi nhận hàng';
            case 'vnpay':
                return 'VNPAY';
            case 'momo':
                return 'MOMO';
            default:
                return String(type);
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    useEffect(() => {
        document.title = 'Quản lý đơn hàng';
    }, []);

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'idPayment',
            key: 'idPayment',
            width: 200,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 150,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 130,
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'typePayment',
            key: 'typePayment',
            width: 150,
            render: (type: Order['typePayment']) => {
                return <span>{getPaymentTypeText(type)}</span>;
            },
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            width: 130,
            render: (total: number) => {
                return <span>{total.toLocaleString('vi-VN')} đ</span>;
            },
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date: string) => formatDate(date),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 130,
            render: (status: Order['status']) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>,
        },
        {
            title: 'Thao tác',
            key: 'actions',
            width: 220,
            render: (_: unknown, record: Order) => {
                // Định nghĩa các tùy chọn dựa trên trạng thái hiện tại
                const getOptions = () => {
                    const options = [];

                    if (record.status === 'pending') {
                        options.push({ value: 'processing', label: 'Xác nhận đơn hàng' });
                        options.push({ value: 'cancelled', label: 'Hủy đơn hàng' });
                    } else if (record.status === 'processing') {
                        options.push({ value: 'shipping', label: 'Đang giao hàng' });
                        options.push({ value: 'cancelled', label: 'Hủy đơn hàng' });
                    } else if (record.status === 'shipping') {
                        options.push({ value: 'completed', label: 'Hoàn thành' });
                    }

                    return options;
                };

                const handleActionChange = (value: string) => {
                    if (['processing', 'completed', 'cancelled', 'shipping'].includes(value)) {
                        handleUpdateStatus(record.idPayment, value as Order['status']);
                    }
                };

                // CSS cho Select component
                const selectStyle = {
                    width: 150,
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                };

                const buttonStyle = {
                    marginRight: '8px',
                };

                const options = getOptions();

                return (
                    <Space>
                        <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={() => handleViewOrder(record)}
                            style={buttonStyle}
                        >
                            Xem
                        </Button>

                        {options.length > 0 && (
                            <Select
                                placeholder="Thao tác"
                                style={selectStyle}
                                onChange={handleActionChange}
                                options={options}
                                dropdownStyle={{ borderRadius: '4px' }}
                                className={cx('action-select')}
                            />
                        )}
                    </Space>
                );
            },
        },
    ];

    return (
        <div className={cx('manager-order')}>
            <div className={cx('header')}>
                <h2>Quản lý đơn hàng</h2>
                <div className={cx('filters')}>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm theo mã đơn, tên, SĐT"
                        value={searchText}
                        onChange={handleSearch}
                        style={{ width: 250, marginRight: 16 }}
                    />
                    <Select
                        prefix={<FilterOutlined />}
                        placeholder="Lọc theo trạng thái"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ width: 180 }}
                    >
                        <Option value="all">Tất cả trạng thái</Option>
                        <Option value="pending">Chờ xử lý</Option>
                        <Option value="processing">Đang xử lý</Option>
                        <Option value="shipping">Đang giao</Option>
                        <Option value="completed">Hoàn thành</Option>
                        <Option value="cancelled">Đã hủy</Option>
                    </Select>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={filteredOrders}
                rowKey="idPayment"
                loading={loading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1100 }}
                className={cx('order-table')}
            />

            {currentOrder && (
                <Modal
                    title="Chi tiết đơn hàng"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={[
                        <Button key="back" onClick={() => setIsModalOpen(false)}>
                            Đóng
                        </Button>,
                    ]}
                    width={800}
                >
                    <Descriptions bordered column={2} className={cx('order-details')}>
                        <Descriptions.Item label="Mã đơn hàng" span={2}>
                            {currentOrder.idPayment}
                        </Descriptions.Item>
                        <Descriptions.Item label="Khách hàng" span={2}>
                            {currentOrder.fullName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{currentOrder.phone}</Descriptions.Item>
                        <Descriptions.Item label="Ngày đặt hàng">
                            {formatDate(currentOrder.createdAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phương thức thanh toán">
                            {getPaymentTypeText(currentOrder.typePayment)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag color={getStatusColor(currentOrder.status)}>{getStatusText(currentOrder.status)}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ" span={2}>
                            {currentOrder.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ghi chú" span={2}>
                            {currentOrder.note || 'Không có ghi chú'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền" span={2}>
                            <strong>{currentOrder.orderTotal.toLocaleString('vi-VN')} đ</strong>
                        </Descriptions.Item>
                    </Descriptions>

                    <div className={cx('products-list')}>
                        <h3 style={{ margin: '20px 0 10px' }}>Sản phẩm trong đơn hàng</h3>
                        <List
                            grid={{ gutter: 16, column: 1 }}
                            dataSource={currentOrder.products}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ marginRight: '20px' }}>
                                                {item.productDetails.images ? (
                                                    <img
                                                        src={`http://localhost:3000/uploads/images/${item.productDetails.images}`}
                                                        alt={item.productDetails.name}
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            objectFit: 'cover',
                                                            border: '1px solid #eee',
                                                        }}
                                                    />
                                                ) : item.productDetails.thumbnail ? (
                                                    <img
                                                        src={`http://localhost:3000/uploads/images/${item.productDetails.thumbnail}`}
                                                        alt={item.productDetails.name}
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            objectFit: 'cover',
                                                            border: '1px solid #eee',
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            background: '#f0f0f0',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        Không có ảnh
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4>{item.productDetails.name}</h4>
                                                <p>Giá: {item.productDetails.price.toLocaleString('vi-VN')} đ</p>
                                                <p>Số lượng: {item.quantity}</p>
                                                <p>
                                                    <strong>
                                                        Thành tiền: {item.itemPrice.toLocaleString('vi-VN')} đ
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default ManagerOrder;
