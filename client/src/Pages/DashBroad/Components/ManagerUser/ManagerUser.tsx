import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManagerUser.module.scss';
import { Table, Switch, message, Typography, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { requestGetAllUser, requestUpdateUser } from '../../../../Config/request';

const { Title } = Typography;
const cx = classNames.bind(styles);

interface User {
    id: string;
    fullName: string;
    email: string;
    isAdmin: string;
    createdAt?: string;
}

function ManagerUser() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [updateLoading, setUpdateLoading] = useState<Record<string, boolean>>({});

    useEffect(() => {
        document.title = 'Quản lý tài khoản';
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await requestGetAllUser();
            setUsers(response.metadata);
        } catch (error) {
            message.error('Không thể tải danh sách người dùng');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAdmin = async (checked: boolean, userId: string) => {
        setUpdateLoading((prev) => ({ ...prev, [userId]: true }));
        try {
            await requestUpdateUser({ id: userId, isAdminUser: checked ? '1' : '0' });
            message.success('Cập nhật quyền thành công');

            fetchUsers();
        } catch (error) {
            message.error('Cập nhật quyền thất bại');
            console.error(error);
        } finally {
            setUpdateLoading((prev) => ({ ...prev, [userId]: false }));
        }
    };

    const columns: ColumnsType<User> = [
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Quyền quản trị',
            key: 'isAdmin',
            render: (_, record: User) => (
                <Switch
                    checked={record.isAdmin === '1'}
                    onChange={(checked) => handleToggleAdmin(checked, record.id)}
                    loading={updateLoading[record.id]}
                    checkedChildren="Admin"
                    unCheckedChildren="User"
                />
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => (date ? new Date(date).toLocaleDateString() : ''),
        },
    ];

    return (
        <div className={cx('manager-user')}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div className={cx('header')}>
                    <Title level={3}>Quản lý người dùng</Title>
                </div>
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Tổng cộng ${total} người dùng`,
                    }}
                />
            </Space>
        </div>
    );
}

export default ManagerUser;
