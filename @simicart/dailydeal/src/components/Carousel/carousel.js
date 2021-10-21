import React, { useState, useRef } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';
import Slider from 'react-slick';
import defaultClasses from './carousel.css';
import { useProductDetails } from '../../talons/useProductDetail';
import { calculateTimeLeft } from '../../override/DailyDeals/dailyDeal';
import { useProductList } from '../../talons/useProductList';
import GalleryItem from '../../override/Item/item';

const Carousel = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { productListData,
        productListLoading,
        derivedErrorMessage } = useProductList();
    // console.log("productListData", productListData)
    const skuDatas = [];
    if (productListData) {
        var len = productListData.MpDailyDeals.items.length;
        for (var i = 0; i < len; i++) {
            let skuData = productListData.MpDailyDeals.items[i].product_sku
            let dateTo = productListData.MpDailyDeals.items[i].date_to
            const totalSeconds = calculateTimeLeft(dateTo);
            if (totalSeconds > 0) {
                skuDatas.push(skuData);
            }
        }
    }
    // console.log("skuDatas", skuDatas);

    const { detailsData,
        detailsLoading,
        deriveErrorMessage } = useProductDetails({ sku_product: skuDatas });
    // console.log("detailsData", detailsData)
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (<div className={classes.root}>

        <Slider {...settings}>
            {detailsData.products.items.map(i => {
                return (
                    <GalleryItem
                    key={i.id}
                    item={i}
                />
                )
            })}
        </Slider>

    </div>);
}

Carousel.propTypes = {
    classes: shape({ root: string })
};
Carousel.defaultProps = {};
export default Carousel;

