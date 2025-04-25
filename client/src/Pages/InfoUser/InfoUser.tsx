import classNames from 'classnames/bind';
import styles from './InfoUser.module.scss';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Layout, Menu, Avatar, Typography, Divider } from 'antd';
import { ShoppingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagerOrder from './Components/ManagerOrder/ManagerOrder';
import ManagerCustomer from './Components/ManagerCustomer/ManagerCustomer';
import { useStore } from '../../hooks/useStore';
import { requestLogout } from '../../Config/request';

const cx = classNames.bind(styles);
const { Content, Sider } = Layout;
const { Title } = Typography;

function InfoUser() {
    const [selectedKey, setSelectedKey] = useState('1');

    const { dataUser } = useStore();

    useEffect(() => {
        document.title = 'Thông tin tài khoản';
    }, []);

    const navigate = useNavigate();

    const menuItems = [
        {
            key: '1',
            icon: <ShoppingOutlined />,
            label: 'Danh sách sản phẩm',
        },
        {
            key: '2',
            icon: <UserOutlined />,
            label: 'Thông tin tài khoản',
        },

        {
            key: '3',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: async () => {
                await requestLogout();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                navigate('/');
            },
        },
    ];

    // Dummy data for purchased products

    const handleMenuClick = (key: string) => {
        setSelectedKey(key);
    };

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <ManagerOrder />;
            case '2':
                return <ManagerCustomer />;
            case '3':
                return <div></div>;
            default:
                return <div>Sản phẩm đã mua</div>;
        }
    };

    return (
        <div className={cx('info-user')}>
            <header>
                <Header />
            </header>

            <main className={cx('main-content')}>
                <Layout className={cx('user-layout')}>
                    <Sider width={300} className={cx('user-sider')} theme="light">
                        <div className={cx('user-profile')}>
                            <Avatar size={120} icon={<UserOutlined />} className={cx('user-avatar')} />
                            <Title level={3} className={cx('user-name')}>
                                {dataUser?.fullName}
                            </Title>
                        </div>
                        <Divider className={cx('divider')} />
                        <Menu
                            mode="vertical"
                            selectedKeys={[selectedKey]}
                            className={cx('user-menu')}
                            items={menuItems}
                            onClick={({ key }) => handleMenuClick(key)}
                        />
                    </Sider>
                    <Content className={cx('user-content')}>{renderContent()}</Content>
                </Layout>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default InfoUser;
