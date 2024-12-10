import React from "react";
import { useCart } from "../context/cartContext";
import Link from "next/link";
function Checkout() {
  const { cart, increaseQuantity, decreaseQuantity, removeProduct } = useCart();
  return (
    
    <div>
      <section className="text-gray-600 body-font relative ">
        <div className="container px-5 pt-4 mx-auto">
          <div className="flex flex-col text-center w-full ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Checkout
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <h3 className="text-xl font-bold  ">Details : </h3>
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                   htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                   htmlFor="city"
                    className="leading-7 text-sm text-gray-600"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="pincode"
                    className="leading-7 text-sm text-gray-600"
                  >
                    PinCode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </section>
      <div className="text-gray-600 body-font relative">
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <h3 className="text-xl font-bold  ">Review Product : </h3>
            
              <table className="p-2 w-full ">
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 ">
                        <div className="flex items-center">
                          <span className="font-semibold mr-4">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 ">{`₹${item.price}`}</td>
                      <td className="py-2 ">
                        <div className="flex items-center">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="border rounded-md px-2 mr-2 ml-3"
                          >
                            -
                          </button>
                          <span className="text-center w-2">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="border rounded-xl px-2 ml-2 mr-2"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">{`₹${(item.price * item.quantity).toFixed(2)}`}</td>
                      <td className="py-4">
                        <button
                          onClick={() => removeProduct(item.id)}
                          className="text-red-500 hover:text-red-700 ml-3"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-left text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Proceed To Pay
                </button>
              </div>
            </div>
         
          
      </div>
    </div>
  );
}

export default Checkout;
