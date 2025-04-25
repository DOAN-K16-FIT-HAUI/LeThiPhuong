import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { requestAddCart, requestGetProductById } from '../../Config/request';
import { useParams } from 'react-router-dom';
import CardBody from '../../Components/CardBody/CardBody';
import { Avatar, message, Rate, Divider, Card, Typography, Space } from 'antd';
import { useStore } from '../../hooks/useStore';
import { UserOutlined } from '@ant-design/icons';

interface DataReview {
    user: {
        fullName: string;
    };
    dataValues: {
        rating: number;
        comment: string;
    };
}

const cx = classNames.bind(styles);

function DetailProduct() {
    const { id } = useParams();

    const ref = useRef<HTMLInputElement>(null);

    const [product, setProduct] = useState<any>(null);
    const [productRelated, setProductRelated] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const [dataReview, setDataReview] = useState([]);

    const { fetchCart } = useStore() as { fetchCart: () => void };

    const fetchData = async () => {
        const res = await requestGetProductById(id as string);
        setProduct(res.metadata.product);
        setProductRelated(res.metadata.productRelated);
        setDataReview(res.metadata.dataReivew);
    };

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });

        fetchData();
    }, [id]);

    const handleAddCart = async () => {
        const data = {
            productId: id,
            quantity: quantity,
        };
        try {
            await requestAddCart(data);
            await fetchCart();
            await fetchData();
            message.success('Thêm vào giỏ hàng thành công');
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    };

    const handleQuantity = (type: string) => {
        if (type === 'increase') {
            setQuantity(quantity + 1);
        } else if (type === 'decrease') {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className={cx('detail-product')} ref={ref}>
            <header>
                <Header />
            </header>
            <main className={cx('container')}>
                <div className={cx('product-container')}>
                    <div className={cx('product-image')}>
                        <img src={`http://localhost:3000/uploads/images/${product?.images}`} alt="Gọng kính" />
                    </div>

                    <div className={cx('product-info')}>
                        <h1 className={cx('product-name')}>{product?.name}</h1>
                        <div className={cx('product-price')}>{product?.price.toLocaleString()}đ</div>

                        <div className={cx('product-description')}>
                            <p dangerouslySetInnerHTML={{ __html: product?.description }} />
                        </div>

                        <div className={cx('product-actions')}>
                            <div className={cx('quantity-selector')}>
                                <button onClick={() => handleQuantity('decrease')} className={cx('quantity-btn')}>
                                    <FaMinus />
                                </button>
                                <input type="text" value={quantity} readOnly />
                                <button onClick={() => handleQuantity('increase')} className={cx('quantity-btn')}>
                                    <FaPlus />
                                </button>
                            </div>

                            <button onClick={handleAddCart} className={cx('add-to-cart-btn')}>
                                Thêm vào giỏ • {product?.price.toLocaleString()}đ
                            </button>
                        </div>

                        <div className={cx('product-availability')}>
                            <div className={cx('stock')}>Còn {product?.stock} sản phẩm</div>
                        </div>
                    </div>
                </div>
                <div className={cx('product-review')}>
                    <Typography.Title level={4} style={{ marginBottom: 24 }}>
                        Đánh giá sản phẩm
                    </Typography.Title>

                    {dataReview.length > 0 ? (
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            {dataReview.map((item: DataReview, index: number) => (
                                <Card
                                    key={index}
                                    className={cx('review-card')}
                                    bordered={false}
                                    style={{
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        borderRadius: '8px',
                                        padding: '8px',
                                    }}
                                >
                                    <div className={cx('review-header')}>
                                        <Space size={16} align="center">
                                            <Avatar
                                                size={48}
                                                icon={<UserOutlined />}
                                                style={{ backgroundColor: '#1890ff' }}
                                            />
                                            <div>
                                                <Typography.Title level={5} style={{ margin: 0 }}>
                                                    {item?.user?.fullName}
                                                </Typography.Title>
                                                <Rate
                                                    disabled
                                                    defaultValue={item?.dataValues?.rating}
                                                    style={{ fontSize: 16 }}
                                                />
                                            </div>
                                        </Space>
                                    </div>
                                    <Divider style={{ margin: '12px 0' }} />
                                    <Typography.Paragraph style={{ margin: 0, fontSize: 15 }}>
                                        {item?.dataValues?.comment}
                                    </Typography.Paragraph>
                                </Card>
                            ))}
                        </Space>
                    ) : (
                        <Card style={{ textAlign: 'center', padding: '24px' }}>
                            <Typography.Text type="secondary">Chưa có đánh giá nào cho sản phẩm này</Typography.Text>
                        </Card>
                    )}
                </div>
                <div className={cx('product-related')}>
                    <h4>Sản phẩm cùng loại</h4>
                    <div className={cx('product-related-list')}>
                        {productRelated
                            ?.filter((item: any) => item.id !== id)
                            .map((item: any) => (
                                <CardBody key={item.id} product={item} />
                            ))}
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default DetailProduct;
