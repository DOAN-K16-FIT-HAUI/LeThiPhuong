import { Link } from 'react-router-dom';
import styles from './CardBody.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function CardBody({ product }: { product: any }) {
    return (
        <Link className={cx('card-body-link')} to={`/product/${product.id}`}>
            <div className={cx('card-body')}>
                <img src={`http://localhost:3000/uploads/images/${product.images}`} alt="" />

                <div className={cx('card-body-content')}>
                    <h4>{product.name}</h4>
                    <button>{product.price.toLocaleString('vi-VN')}đ</button>
                </div>
            </div>
        </Link>
    );
}

export default CardBody;
