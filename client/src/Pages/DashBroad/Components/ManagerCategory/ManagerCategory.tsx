import classNames from 'classnames/bind';
import styles from './ManagerCategory.module.scss';
import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table, message } from 'antd';
import {
    requestCreateCategory,
    requestDeleteCategory,
    requestEditCategory,
    requestGetCategory,
} from '../../../../Config/request';

const cx = classNames.bind(styles);

interface Category {
    id: number;
    name: string;
    products: any[];
}

interface FormValues {
    nameCategory: string;
}

function ManagerCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [form] = Form.useForm<FormValues>();

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await requestGetCategory();
            setCategories(response.metadata);
            setLoading(false);
        } catch (error) {
            message.error('Không thể tải danh mục');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle form submission
    const handleSubmit = async (values: FormValues) => {
        try {
            if (editMode && currentCategory) {
                const data = {
                    idCategory: currentCategory.id,
                    nameCategory: values.nameCategory,
                };
                await requestEditCategory(data);
                await fetchCategories();
                message.success('Cập nhật danh mục thành công');
            } else {
                const data = {
                    nameCategory: values.nameCategory,
                };
                await requestCreateCategory(data);
                await fetchCategories();

                message.success('Tạo danh mục thành công');
            }
            setModalVisible(false);
            form.resetFields();
            fetchCategories();
        } catch (error) {
            message.error(editMode ? 'Cập nhật danh mục thất bại' : 'Tạo danh mục thất bại');
        }
    };

    // Handle delete category
    const handleDelete = async (id: string) => {
        try {
            await requestDeleteCategory(id);
            message.success('Xóa danh mục thành công');
            fetchCategories();
        } catch (error) {
            message.error('Xóa danh mục thất bại');
        }
    };

    // Open modal for edit
    const handleEdit = (category: Category) => {
        setEditMode(true);
        setCurrentCategory(category);
        form.setFieldsValue({
            nameCategory: category.name,
        });
        setModalVisible(true);
    };

    // Open modal for create
    const handleCreate = () => {
        setEditMode(false);
        setCurrentCategory(null);
        form.resetFields();
        setModalVisible(true);
    };

    useEffect(() => {
        document.title = 'Quản lý danh mục';
    }, []);

    // Table columns
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên Danh Mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số Sản Phẩm',
            key: 'products',
            render: (_: any, record: Category) => (record.products ? record.products.length : 0),
        },
        {
            title: 'Thao Tác',
            key: 'actions',
            render: (_: any, record: Category) => (
                <div className={cx('action-buttons')}>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa danh mục này?"
                        onConfirm={() => handleDelete(record.id.toString())}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className={cx('manager-category')}>
            <div className={cx('header')}>
                <h1>Quản Lý Danh Mục</h1>
                <Button type="primary" onClick={handleCreate}>
                    Thêm Danh Mục Mới
                </Button>
            </div>

            <Table
                loading={loading}
                dataSource={categories}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={editMode ? 'Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name="nameCategory"
                        label="Tên Danh Mục"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                    >
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editMode ? 'Cập Nhật' : 'Tạo Mới'}
                        </Button>
                        <Button onClick={() => setModalVisible(false)} style={{ marginLeft: 8 }}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ManagerCategory;
