import React from 'react';
import Image from 'next/image';
import Product from '@/models/products';
import connectToDatabase from '@/middle/db'; // Adjust path based on your project structure
import Link from 'next/link';

function Tshirt({ products }) {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((product) => (
              <div key={product._id} className="lg:w-1/4 md:w-1/2 xl:p-4 sm:p-20 mb-2  w-full">
                <Link href={`/products/${product.slug}`} className="block relative h-80 rounded overflow-hidden">
                 
                    <Image
                      alt="ecommerce"
                      className="object-cover object-top w-80 block h-full"
                      width={300}
                      height={300}
                      src={product.img}
                    />
               
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.title}
                  </h2>
                  <p className="mt-1">₹{product.price}</p>
                  <p className="mt-1">{product.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await connectToDatabase();
    const products = await Product.find({});
console.log(products)
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)), // Serialize MongoDB data
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default Tshirt;
