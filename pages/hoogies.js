import Image from 'next/image'
import React from 'react'
function hoogies() {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 xl:p-4 sm:p-20 lg:p-0 w-full">
               
                <a className="block relative h-80 rounded overflow-hidden">
                {index % 2 === 0 ?<Image
                    alt="ecommerce"
                    className=" object-cover object-top w-80 block h-full "
                    width={300}
                    height={50}
                    src="/girlshodies.jpg"
                  />:  <Image
                  alt="ecommerce"
                  className=" object-cover object-top w-80 block h-full "
                  width={300}
                  height={50}
                  src="/menhoodies.jpg"
                />}
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    Hoodies
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {index % 2 === 0 ? 'NOBERO Men Hooded Sweatshirt' : 'SXV STYLE Basic Solid Cropped Zipper Hoodie for Women'}
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

export default hoogies
