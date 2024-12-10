import Image from 'next/image'
import React from 'react'
function mug() {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 xl:p-4 sm:p-20 w-full">

                <a className="block relative h-80 rounded overflow-hidden">
                  {index % 2 === 0 ? <Image
                    alt="ecommerce"
                    className=" object-cover object-top w-80 block h-full "
                    width={300}
                    height={50}
                    src="/whitemug.jpg"
                  /> : <Image
                    alt="ecommerce"
                    className=" object-cover object-top w-80 block h-full "
                    width={300}
                    height={50}
                    src="/mugs.webp"
                  />}
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                   Mugs
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {index % 2 === 0 ? 'Shay Large Ceramic Coffee Cup Set of 2, Teal Green, 320ml ': 'Noritake Japan - Porcelain Tea And Coffee Mug Set Of 6'}
                  </h2>
                  <p className="mt-1">₹{(16 + index * 2).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default mug
