import React from "react";
import { Button, Carousel, Col, Row, Tooltip } from "antd";
import PlaceHolderImg from "../../../../assets/img/product-placeholder.png";
import { formatVietnameseCurrency } from "../../../../utils/common";
import PropTypes from "prop-types";
import { RetweetOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addProductToCompare } from "../../../../app/slices/compare";
import { addProduct as addProductToCart } from "../../../../app/slices/cart";

function ProductCarousel(props) {
    const dispatch = useDispatch();
    const { products } = props;

    const handleAddCompareProduct = (product) => {
        dispatch(addProductToCompare(product));
    };

    const handleAddProductToCart = (product) => {
        dispatch(addProductToCart(product));
    };

    return (
        <Col span={12}>
            <Carousel speed={2000} autoplay={true} autoplaySpeed={10000} pauseOnHover={false} dots={false}>
                {products.map((product) => (
                    <div key={product["id"]}>
                        <Row>
                            <Col span={16} push={4}>
                                <Row
                                    align="middle"
                                    gutter={10}
                                    style={{
                                        border: "1px solid #EEEFEE",
                                        marginTop: 5,
                                        marginBottom: 5,
                                        padding: 10,
                                        cursor: "pointer",
                                        backgroundColor: "white",
                                    }}
                                >
                                    <Col span={14}>
                                        <img src={PlaceHolderImg} className="product-card__img" alt="Product img" />
                                    </Col>
                                    <Col span={10}>
                                        <h5 className="txt--uppercase txt--dark-olive txt--ellipsis txt--ellipsis-1">{product["categoryName"] || product["brandName"]}</h5>
                                        <h4 className="txt--ellipsis txt--ellipsis-3">{product["name"]}</h4>
                                        <h4 className="txt--dark-olive">
                                            {formatVietnameseCurrency(product["price"])}
                                        </h4>
                                        <p className="txt--ellipsis txt--ellipsis-5" style={{ marginTop: 10 }}>
                                            {product["description"]}
                                        </p>
                                        <Button
                                            onClick={() => handleAddProductToCart(product)}
                                            className="bg--dark-olive txt--uppercase"
                                        >
                                            Cho vào giỏ hàng
                                        </Button>
                                        <Tooltip title="So sánh sản phẩm">
                                            <Button
                                                onClick={() => handleAddCompareProduct(product)}
                                                className="bg--dark-olive"
                                            >
                                                <RetweetOutlined />
                                            </Button>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Carousel>
        </Col>
    );
}

ProductCarousel.propTypes = {
    products: PropTypes.array,
};

ProductCarousel.defaultProps = {
    products: [],
};

export default ProductCarousel;
