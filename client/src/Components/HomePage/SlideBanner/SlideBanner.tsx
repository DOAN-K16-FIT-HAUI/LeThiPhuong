import classNames from 'classnames/bind';
import styles from './SlideBanner.module.scss';

import Slider from 'react-slick';

const cx = classNames.bind(styles);

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
};

function SlideBanner() {
    return (
        <div className={cx('slide-banner')}>
            <Slider {...settings}>
                <div>
                    <img
                        src="https://kinhmatanna.com/_next/image?url=https%3A%2F%2Fcms.kinhmatanna.com%2Fwp-content%2Fuploads%2F2024%2F11%2Fcover-web-07.png&w=1920&q=75"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://kinhmatanna.com/_next/image?url=https%3A%2F%2Fcms.kinhmatanna.com%2Fwp-content%2Fuploads%2F2024%2F09%2Fbanner-web-he-thong-cua-hang-01.png&w=1920&q=75"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://kinhmatanna.com/_next/image?url=https%3A%2F%2Fcms.kinhmatanna.com%2Fwp-content%2Fuploads%2F2025%2F04%2FCover-web-ban-PC.webp&w=1920&q=75"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://kinhmatanna.com/_next/image?url=https%3A%2F%2Fcms.kinhmatanna.com%2Fwp-content%2Fuploads%2F2025%2F04%2Fweb-02.webp&w=1920&q=75"
                        alt=""
                    />
                </div>
            </Slider>
        </div>
    );
}

export default SlideBanner;
