import SlideBanner from './SlideBanner/SlideBanner';
import classNames from 'classnames/bind';

import styles from './HomePage.module.scss';
import CardBody from '../CardBody/CardBody';
import { useStore } from '../../hooks/useStore';

interface Category {
    id: string;
    name: string;
    products: Product[];
}

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

const cx = classNames.bind(styles);

function HomePage() {
    const { category } = useStore();

    return (
        <div className={cx('home-page')}>
            <div>
                <SlideBanner />
            </div>

            <div className={cx('main-content')}>
                {category?.map((item: Category) => (
                    <div key={item.id} className={cx('content-group')}>
                        <div className={cx('content-group-header')}>
                            <h3>{item.name}</h3>
                            <button>Xem thêm</button>
                        </div>

                        <div className={cx('list-product')}>
                            {item.products.map((product: Product) => (
                                <CardBody key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
