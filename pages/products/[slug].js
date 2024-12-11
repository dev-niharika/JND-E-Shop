import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCart } from '../../context/cartContext';
import Product from '@/models/products';
import connectToDatabase from '@/middle/db';

const Post = ({ product, variant }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select a color and size.');
      return;
    }

    addToCart({ ...product, selectedColor, selectedSize });
  };
  // State to manage selected color and size
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState(product.size);

  // Handle color selection
  const handleColorSelect = (color) => {
    if (variant[color]) {
      const firstAvailableSize = Object.keys(variant[color])[0];
      const slug = variant[color][firstAvailableSize]?.slug;
      if (slug) {
        router.push(`/products/${slug}`);
        window.location.href = `/products/${slug}`;
      }
    }
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    if (variant[product.color] && variant[product.color][size]) {
      const slug = variant[product.color][size]?.slug;
      if (slug) {
        router.push(`/products/${slug}`);
        window.location.href = `/products/${slug}`;
      }
    }};

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt="ecommerce"
              className="object-cover object-top w-80 block h-full"
              width={300}
              height={50}
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.title}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
              <p className="leading-relaxed">{product.des}</p>

              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variant).map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        selectedColor === color ? 'ring-2 ring-indigo-500' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                      value={selectedSize}
                      onChange={(e) => handleSizeSelect(e.target.value)}
                    >
                      {Object.keys(variant[selectedColor] || {}).map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                      </span>
                  </div>
                </div>
              </div>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900 mr-1">
                  ${product.price}
                </span>
              </div>
              <button
                  onClick={handleAddToCart}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add To Cart
                </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    await connectToDatabase();

    // Fetch the main product
    const product = await Product.findOne({ slug });
    if (!product) {
      return { notFound: true };
    }

    // Fetch all variants of the product
    const variants = await Product.find({ title: product.title });

    // Create the color-size-slug mapping
    const colorsizeslug = {};
    variants.forEach((variant) => {
      if (!colorsizeslug[variant.color]) {
        colorsizeslug[variant.color] = {};
      }
      colorsizeslug[variant.color][variant.size] = { slug: variant.slug };
    });

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        variant: JSON.parse(JSON.stringify(colorsizeslug)),
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      props: { product: null },
    };
  }
}

export default Post;




