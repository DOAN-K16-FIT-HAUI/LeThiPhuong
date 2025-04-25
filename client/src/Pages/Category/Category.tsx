import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requestGetCategoryById } from '../../Config/request';
import CardBody from '../../Components/CardBody/CardBody';
const cx = classNames.bind(styles);

function Category() {
    const [data, setData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await requestGetCategoryById(id || '');
            setData(data.metadata);
        };
        fetchData();
    }, [id]);

    return (
        <div className={cx('category')}>
            <header>
                <Header />
            </header>

            <main>
                <div className={cx('container')}>
                    <div className={cx('category-title')}>
                        <h1>{localStorage.getItem('categoryName')}</h1>
                    </div>

                    <div className={cx('card-body')}>
                        {data.map((item: any) => (
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

export default Category;
