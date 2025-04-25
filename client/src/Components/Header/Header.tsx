import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '../../hooks/useStore';

import { Avatar, Dropdown } from 'antd';

import { UserOutlined, ShoppingOutlined, LogoutOutlined, DashboardFilled } from '@ant-design/icons';
import { requestLogout, requestSearchProduct } from '../../Config/request';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

interface DataUser {
    id?: string;
    fullName?: string;
    email?: string;
    avatar?: string;
    isAdmin?: string;
}

interface DataSearch {
    id?: string;
    name?: string;
    price: number;
    images?: string;
}

const cx = classNames.bind(styles);

function Header() {
    // Remove unused variable
    const { dataUser, category, dataCart } = useStore() as { dataUser: DataUser; category?: any[]; dataCart?: any[] };

    const [valueSearch, setValueSearch] = useState('');
    const [dataSearch, setDataSearch] = useState<DataSearch[]>([]);
    const [categoryId, setCategoryId] = useState('all');

    const navigate = useNavigate();

    const debounceValue = useDebounce(valueSearch, 500);

    const items = [
        {
            key: '1',
            label: <Link to="/profile">Thông tin tài khoản</Link>,
            icon: <UserOutlined />,
            hidden: dataUser.isAdmin === '1',
        },
        {
            key: '2',
            label: <Link to="/orders">Đơn hàng của tôi</Link>,
            icon: <ShoppingOutlined />,
            hidden: dataUser.isAdmin === '1',
        },
        {
            key: '3',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: async () => {
                await requestLogout();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                navigate('/');
            },
        },
    ];

    useEffect(() => {
        const fetchSearch = async () => {
            const res = await requestSearchProduct(debounceValue);
            setDataSearch(res.metadata);
        };
        if (debounceValue === '') {
            return;
        }
        fetchSearch();
    }, [debounceValue]);

    const handleNavigateCategory = async (id: string) => {
        await localStorage.setItem('categoryName', category?.find((item) => item.id === id)?.name || 'Tất cả sản phẩm');
        navigate(`/category/${id}`);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <img src="https://viecday365.com/pictures/2024/03/22/logo-moi-19-09-01-png.png" alt="" />
                    </Link>
                </div>

                <div className={cx('search-bar')}>
                    <select
                        defaultValue={categoryId}
                        onChange={(e) => {
                            setCategoryId(e.target.value);
                        }}
                        name=""
                        id=""
                    >
                        <option value="all">Tất cả sản phẩm</option>
                        {category?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={valueSearch}
                        onChange={(e) => setValueSearch(e.target.value)}
                    />
                    <button onClick={() => handleNavigateCategory(categoryId)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>

                    {valueSearch && (
                        <div className={cx('search-result-wrapper')}>
                            {dataSearch.length > 0 ? (
                                <div className={cx('search-result')}>
                                    {dataSearch.map((item) => (
                                        <Link id={cx('search-result-item')} to={`/product/${item.id}`} key={item.id}>
                                            <div className={cx('search-result-item')}>
                                                <img
                                                    src={`http://localhost:3000/uploads/images/${item.images}`}
                                                    alt=""
                                                />
                                                <div className={cx('search-result-item-info')}>
                                                    <h3>{item.name}</h3>
                                                    <p>{item.price.toLocaleString('vi-VN')}đ</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className={cx('search-result-empty')}>Không tìm thấy kết quả</div>
                            )}
                        </div>
                    )}
                </div>
                {!dataUser.id ? (
                    <div className={cx('button-group')}>
                        <Link to="/register">
                            <button className={cx('button-register')}>Đăng ký</button>
                        </Link>
                        <Link to="/login">
                            <button className={cx('button-login')}>Đăng nhập</button>
                        </Link>
                    </div>
                ) : (
                    <div className={cx('user-menu')}>
                        <div className={cx('cart-menu')}>
                            <Link to="/cart" className={cx('cart-button')}>
                                <ShoppingOutlined style={{ fontSize: '24px' }} />
                                Giỏ hàng ({dataCart?.length})
                            </Link>
                        </div>
                        <Dropdown menu={{ items }} placement="bottomRight" arrow>
                            <div className={cx('user-avatar')}>
                                {dataUser.avatar ? (
                                    <Avatar src={dataUser.avatar} size={40} />
                                ) : (
                                    <Avatar
                                        size={40}
                                        icon={<UserOutlined />}
                                        style={{
                                            backgroundColor: '#87d068',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    />
                                )}
                            </div>
                        </Dropdown>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
