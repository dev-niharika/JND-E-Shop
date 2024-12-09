import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "../context/cartContext"; // Import the custom hook

const Navbar = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeProduct } = useCart(); // Access the cart and methods from the context
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control the dropdown visibility

  const toggleChange = () => {
    setShowConfirm(!showConfirm);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className="text-gray-600 body-font bg-gray-100 shadow-lg">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">JND E-Shop</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link
              href="/"
              className="mr-5 p-2 hover:text-gray-100  hover:bg-gray-700 rounded-xl"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="mr-5 p-2 hover:text-gray-100  hover:bg-gray-700 rounded-xl"
            >
              About
            </Link>
            <Link
              href="/singup"
              className="mr-5 p-2 hover:text-gray-100  hover:bg-gray-700 rounded-xl"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="mr-5 p-2 hover:text-gray-100  hover:bg-gray-700 rounded-xl"
            >
              Login
            </Link>
            
            {/* Dropdown Button */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="mr-5 p-2 hover:text-gray-100 hover:bg-gray-700 rounded-xl"
              >
                Products
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-8  w-36 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <ul className="py-1 ml-4 font-bold ">
                    <li className="hover:bg-gray-300 inline-block px-2 rounded-xl">
                      <Link href="/tshirt">
                      Tshirt
                      </Link>
                    </li>
                    <li className="hover:bg-gray-300 inline-block px-2 rounded-xl">
                      <Link href="/hoogies">
                       Hoodies
                      </Link>
                    </li>
                    <li className="hover:bg-gray-300 inline-block px-2 rounded-xl" >
                      <Link href="/mug">
                        Mugs
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Cart button */}
          {!showConfirm && (
            <button
              onClick={toggleChange}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Cart ({cart.length})
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Confirmation Box */}
      <div
        className={`fixed top-2 right-0 transform transition-transform duration-300 ${
          showConfirm ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-white  w-auto ml-auto p-4 rounded-md ">
          <div className="text-right">
            <button
              onClick={toggleChange}
              className="inline-block bg-indigo-500 text-white rounded-2xl uppercase"
            >
              <svg
                className="h-8 w-8 text-gray-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
          </div>
          <h3 className="text-2xl font-bold -mt-10 mr-10 text-indigo-500 mb-4">
            Added Products
          </h3>

          {/* Check if the cart is empty */}
          {cart.length === 0 ? (
            <p className="text-lg text-center text-gray-500 w-full">
              Your cart is empty.
            </p>
          ) : (
            <div className=" mb-4">
              <table className="w-full">
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 ">
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 ">{`$${item.price}`}</td>
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
                      <td className="py-4">{`$${(item.price * item.quantity).toFixed(2)}`}</td>
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
             <Link href='/checkout'> <button
         
                  className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  ChakeOut
                </button></Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
