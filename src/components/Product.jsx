import "./Product.css";

function Product({ elementProduct, addToCart }) {
  return (
    <div className='item'>
      <img src={`/image/${elementProduct.image}`} />
      <div className='title'>{elementProduct.name}</div>
      <div className='price'>{elementProduct.price}</div>
      <button onClick={() => addToCart(elementProduct)}>Add To Cart</button>
    </div>
  );
}

export default Product;
