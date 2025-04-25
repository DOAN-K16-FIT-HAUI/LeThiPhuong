import styles from './ManagerProduct.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Upload, Space, Popconfirm, message, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';
import {
    requestCreateProduct,
    requestDeleteProduct,
    requestEditProduct,
    requestGetCategory,
    requestGetCategoryById,
    requestSearchProduct,
} from '../../../../Config/request';

import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import useDebounce from '../../../../hooks/useDebounce';

const cx = classNames.bind(styles);

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    stock: number;
    images: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Category {
    id: string;
    name: string;
}

function ManagerProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState<string>('');

    const editorRef = useRef<any>(null);

    // Fetch products and categories
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await requestGetCategoryById('all');
            setProducts(response.metadata || []);
        } catch (error) {
            message.error('Không thể tải danh sách sản phẩm');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await requestGetCategory();
            setCategories(response.metadata || []);
        } catch (error) {
            message.error('Không thể tải danh sách danh mục');
            console.error(error);
        }
    };

    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounce) {
            fetchProducts();
        }
        if (debounce) {
            handleSearch();
        }
    }, [debounce]);

    const handleSearch = async () => {
        if (!searchValue.trim()) {
            fetchProducts();
            return;
        }

        try {
            setLoading(true);
            const response = await requestSearchProduct(debounce);
            setProducts(response.metadata || []);
        } catch (error) {
            message.error('Tìm kiếm thất bại');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const showAddModal = () => {
        setIsEditing(false);
        setCurrentProduct(null);
        setFileList([]);
        form.resetFields();
        setIsModalVisible(true);
    };

    const showEditModal = (product: Product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        form.setFieldsValue({
            name: product.name,
            description: product.description,
            price: product.price,
            categoryId: product.categoryId,
            stock: product.stock,
        });

        // Set file list if product has image
        if (product.images) {
            setFileList([
                {
                    uid: '-1',
                    name: product.images,
                    status: 'done',
                    url: `http://localhost:3000/uploads/images/${product.images}`,
                },
            ]);
        } else {
            setFileList([]);
        }

        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
    };

    const handleDelete = async (id: string) => {
        try {
            await requestDeleteProduct(id);
            message.success('Xoá sản phẩm thành công');
            fetchProducts();
        } catch (error) {
            message.error('Không thể xoá sản phẩm');
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();

            // Lấy nội dung từ editor và thêm vào form data
            if (editorRef.current) {
                formData.append('description', editorRef.current.getContent());
            } else {
                formData.append('description', values.description || '');
            }

            // Thêm các trường khác vào form data
            Object.keys(values).forEach((key) => {
                if (key !== 'upload' && key !== 'description') {
                    formData.append(key, values[key]);
                }
            });

            // Append file if exists
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('file', fileList[0].originFileObj);
            }

            if (isEditing && currentProduct) {
                await requestEditProduct(currentProduct.id, formData);
                message.success('Cập nhật sản phẩm thành công');
            } else {
                await requestCreateProduct(formData);
                message.success('Thêm sản phẩm thành công');
            }

            setIsModalVisible(false);
            await fetchProducts();
            form.resetFields();
            setFileList([]);
        } catch (error) {
            message.error('Thao tác thất bại');
            console.error(error);
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const uploadProps = {
        beforeUpload: (file: any) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('Bạn chỉ có thể tải lên file hình ảnh!');
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        fileList,
        onChange: ({ fileList }: any) => {
            setFileList(fileList.slice(-1)); // Only keep the last uploaded file
        },
        maxCount: 1,
    };

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images: string) =>
                images ? (
                    <img
                        src={`http://localhost:3000/uploads/images/${images}`}
                        alt="Sản phẩm"
                        className={cx('product-image')}
                    />
                ) : (
                    'Không có hình'
                ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `${price.toLocaleString('vi-VN')} ₫`,
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (categoryId: string) => {
                const category = categories.find((cat) => cat.id === categoryId);
                return category ? category.name : categoryId;
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_: any, record: Product) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => showEditModal(record)}>
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xoá sản phẩm này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Đồng ý"
                        cancelText="Huỷ"
                    >
                        <Button danger icon={<DeleteOutlined />}>
                            Xoá
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        document.title = 'Quản lý sản phẩm';
    }, []);

    return (
        <div className={cx('manager-product')}>
            <div className={cx('header')}>
                <h1>Quản lý Sản phẩm</h1>
                <div className={cx('search-container')}>
                    <Input.Search
                        placeholder="Tìm kiếm sản phẩm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={handleSearch}
                        style={{ width: 300 }}
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                        Thêm sản phẩm
                    </Button>
                </div>
            </div>

            <Table
                dataSource={products}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSubmit}
                confirmLoading={loading}
                okText={isEditing ? 'Cập nhật' : 'Thêm'}
                cancelText="Huỷ"
                width={800}
                bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
            >
                <Form form={form} layout="vertical" className={cx('product-form')}>
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm' }]}
                    >
                        <Editor
                            apiKey="1u5bol30whiqt4i7dhz2stiyu3c7mh9aayxlkca2qdaz6rtf"
                            onInit={(_evt, editor) => (editorRef.current = editor)}
                            initialValue={currentProduct?.description || ''}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist',
                                    'autolink',
                                    'lists',
                                    'link',
                                    'image',
                                    'charmap',
                                    'preview',
                                    'anchor',
                                    'searchreplace',
                                    'visualblocks',
                                    'code',
                                    'fullscreen',
                                    'insertdatetime',
                                    'media',
                                    'table',
                                    'code',
                                    'help',
                                    'wordcount',
                                ],
                                toolbar:
                                    'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Giá"
                        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
                    >
                        <InputNumber
                            addonAfter="₫"
                            min={0}
                            style={{ width: '100%' }}
                            formatter={(value) => (value ? `${value}` : '')}
                            precision={0}
                        />
                    </Form.Item>

                    <Form.Item
                        name="categoryId"
                        label="Danh mục"
                        rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm' }]}
                    >
                        <Select>
                            {categories.map((category) => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="stock"
                        label="Số lượng trong kho"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="upload"
                        label="Hình ảnh sản phẩm"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload {...uploadProps} listType="picture">
                            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ManagerProduct;
