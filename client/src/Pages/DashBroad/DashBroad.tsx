import classNames from 'classnames/bind';
import styles from './DashBroad.module.scss';
import { Layout, Menu, Typography } from 'antd';
import {
    AppstoreOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    BarChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ManagerCategory from './Components/ManagerCategory/ManagerCategory';
import ManagerProduct from './Components/ManagerProduct/ManagerProduct';
import ManagerOrder from './Components/ManagerOrder/ManagerOrder';
import ManagerUser from './Components/ManagerUser/ManagerUser';
import Statistics from './Components/Statistics/Statistics';
import { requestGetAdmin } from '../../Config/request';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function DashBroad() {
    const [selectedKey, setSelectedKey] = useState('statistics');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await requestGetAdmin();
                return;
            } catch (error) {
                navigate('/');
            }
        };
        fetchData();
    }, []);

    const menuItems = [
        {
            key: 'statistics',
            icon: <BarChartOutlined />,
            label: 'Thống kê',
        },
        {
            key: 'categories',
            icon: <AppstoreOutlined />,
            label: 'Quản lý danh mục',
        },
        {
            key: 'products',
            icon: <ShoppingOutlined />,
            label: 'Quản lý sản phẩm',
        },
        {
            key: 'orders',
            icon: <ShoppingCartOutlined />,
            label: 'Quản lý đơn hàng',
        },

        {
            key: 'accounts',
            icon: <UserOutlined />,
            label: 'Quản lý tài khoản',
        },
    ];

    const handleMenuClick = (key: string) => {
        setSelectedKey(key);
    };

    useEffect(() => {
        document.title = 'Trang quản trị';
    }, []);

    const renderContent = () => {
        switch (selectedKey) {
            case 'categories':
                return (
                    <div className={cx('content-section')}>
                        <ManagerCategory />
                    </div>
                );
            case 'orders':
                return (
                    <div className={cx('content-section')}>
                        <ManagerOrder />
                    </div>
                );
            case 'products':
                return (
                    <div className={cx('content-section')}>
                        <ManagerProduct />
                    </div>
                );
            case 'statistics':
                return (
                    <div className={cx('content-section')}>
                        <Statistics />
                    </div>
                );
            case 'accounts':
                return (
                    <div className={cx('content-section')}>
                        <ManagerUser />
                    </div>
                );
            default:
                return <Statistics />;
        }
    };

    return (
        <Layout className={cx('admin-layout')}>
            <Header className={cx('admin-header')}>
                <div className={cx('logo')}>
                    <Title level={3} className={cx('logo-text')}>
                        Trang quản trị
                    </Title>
                </div>
            </Header>
            <Layout>
                <Sider width={250} className={cx('admin-sider')} theme="light">
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        className={cx('admin-menu')}
                        items={menuItems}
                        onClick={({ key }) => handleMenuClick(key as string)}
                    />
                </Sider>
                <Content className={cx('admin-content')}>{renderContent()}</Content>
            </Layout>
        </Layout>
    );
}

export default DashBroad;
