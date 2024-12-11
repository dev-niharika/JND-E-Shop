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
            {Object.keys(products).map((product) => (
              <div key={products[product]._id} className="lg:w-1/4 md:w-1/2 xl:p-4 sm:p-20 mb-2  w-full">
                <Link href={`/products/${products[product].slug}`} className="block relative h-80 rounded overflow-hidden">
                 
                    <Image
                      alt="ecommerce"
                      className="object-cover object-top w-80 block h-full"
                      width={300}
                      height={300}
                      src={products[product].img}
                    />
               
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {products[product].category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {products[product].title}
                  </h2>
                  <p className="mt-1">₹{products[product].price}</p>
                  <p className="mt-1">
                    {products[product].size.includes('S') && <span className='px-1 mr-1 border rounded-sm border-black'>S</span>}
                    {products[product].size.includes('M') && <span className='px-1 border mr-1 rounded-sm border-black'>M</span>}
                    {products[product].size.includes('L') && <span className='px-1 border mr-1 rounded-sm border-black'>L</span>}
                    {products[product].size.includes('X') && <span className='px-1 border mr-1 rounded-sm border-black'>X</span>}
                    {products[product].size.includes('XL') && <span className='px-1 border mr-1 rounded-sm border-black'>XL</span>}
                    </p>
                    <p className="mt-1">
                    {products[product].color.includes('black') && <button class="border-2 border-black ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}                   
                    {products[product].color.includes('blue') && <button class="border-2 border-blue-950 ml-1 bg-blue-950 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[product].color.includes('brown') && <button class="border-2 border-red-950 ml-1 bg-red-950 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[product].color.includes('yellow') &&  <button class="border-2 border-yellow-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[product].color.includes('green') &&  <button class="border-2 border-green-800 ml-1 bg-green-800 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </p>

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
    
    // Limiting fields fetched and adding pagination if necessary
    const products = await Product.find({ category: "Tshirt" })
      .select('title color size price img slug availableQty')  // Select only needed fields
      .limit(100);  // Consider pagination or limiting the number of results

    const tshirt = {};
    products.forEach(item => {
      if (item.availableQty > 0) {
        if (!tshirt[item.title]) {
          tshirt[item.title] = { ...item.toObject(), color: [item.color], size: [item.size] };
        } else {
          if (!tshirt[item.title].color.includes(item.color)) tshirt[item.title].color.push(item.color);
          if (!tshirt[item.title].size.includes(item.size)) tshirt[item.title].size.push(item.size);
        }
      }
    });

    return {
      props: {
        products: JSON.parse(JSON.stringify(tshirt)),
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
