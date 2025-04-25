import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Statistics.module.scss';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { requestStatistics } from '../../../../Config/request';

const cx = classNames.bind(styles);

// Default colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function Statistics() {
    const [statistics, setStatistics] = useState({
        users: [],
        orders: [],
        dailyRevenue: [],
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Fetch statistics data from API
    useEffect(() => {
        document.title = 'Thống kê';
        const fetchStatistics = async () => {
            try {
                setLoading(true);
                const response = await requestStatistics();

                // API should now return properly formatted data with fallbacks
                setStatistics(response.metadata);
                setError(false);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    // Determine if we have meaningful data for each chart
    const hasUserData = statistics.users && statistics.users.length > 0;
    const hasOrderData = statistics.orders && statistics.orders.length > 0;
    const hasDailyRevenueData = statistics.dailyRevenue && statistics.dailyRevenue.length > 0;

    // Check if there's any non-zero revenue data

    // Get total values for summary cards with no fallbacks
    const totalUsers = statistics.totalUsers || 0;
    const totalOrders = statistics.totalOrders || 0;
    const totalRevenue = statistics.totalRevenue || 0;
    const averageOrder = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    if (loading) {
        return (
            <div className={cx('statistics')}>
                <h1 className={cx('title')}>Đang tải thống kê...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className={cx('statistics')}>
                <h1 className={cx('title')}>Không thể tải thống kê. Vui lòng thử lại sau.</h1>
            </div>
        );
    }

    return (
        <div className={cx('statistics')}>
            <h1 className={cx('title')}>Thống kê</h1>

            {/* Summary Cards */}
            <div className={cx('summary-cards')}>
                <div className={cx('card')}>
                    <div className={cx('card-icon', 'users')}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div className={cx('card-content')}>
                        <h3>Tổng khách hàng</h3>
                        <p>{totalUsers.toLocaleString()}</p>
                    </div>
                </div>

                <div className={cx('card')}>
                    <div className={cx('card-icon', 'orders')}>
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div className={cx('card-content')}>
                        <h3>Đơn hàng</h3>
                        <p>{totalOrders.toLocaleString()}</p>
                    </div>
                </div>

                <div className={cx('card')}>
                    <div className={cx('card-icon', 'revenue')}>
                        <i className="fas fa-money-bill-wave"></i>
                    </div>
                    <div className={cx('card-content')}>
                        <h3>Doanh thu (VND)</h3>
                        <p>{totalRevenue.toLocaleString()}</p>
                    </div>
                </div>

                <div className={cx('card')}>
                    <div className={cx('card-icon', 'average')}>
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <div className={cx('card-content')}>
                        <h3>Giá trị đơn hàng trung bình</h3>
                        <p>{averageOrder.toLocaleString()} VND</p>
                    </div>
                </div>
            </div>

            {/* Charts - Only show if there is actual data */}
            <div className={cx('charts-container')}>
                {/* User Growth Chart */}
                {hasUserData && (
                    <div className={cx('chart-card')}>
                        <h2>Tăng trưởng khách hàng</h2>
                        <div className={cx('chart')}>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={statistics.users} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="userGrowth" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#8884d8"
                                        fillOpacity={1}
                                        fill="url(#userGrowth)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Order Distribution Chart - Only if there's real data */}
                {hasOrderData && (
                    <div className={cx('chart-card')}>
                        <h2>Danh mục sản phẩm</h2>
                        <div className={cx('chart')}>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={statistics.orders}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {statistics.orders.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Daily Revenue Chart */}
                <div className={cx('chart-card')}>
                    <h2>Doanh thu 7 ngày gần nhất (VND)</h2>
                    <div className={cx('chart')}>
                        {hasDailyRevenueData ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={statistics.dailyRevenue}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [`${Number(value).toLocaleString()} VND`, 'Doanh thu']}
                                    />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className={cx('no-data-message')}>
                                <p>Chưa có dữ liệu doanh thu. Doanh thu sẽ được hiển thị khi có đơn hàng được tạo.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Show message if no charts have data */}
            {!hasUserData && !hasOrderData && !hasDailyRevenueData && (
                <div className={cx('no-data')}>
                    <p>Chưa có dữ liệu thống kê. Vui lòng thêm người dùng và đơn hàng để xem thống kê.</p>
                </div>
            )}
        </div>
    );
}

export default Statistics;
