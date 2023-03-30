import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";

export const HomeContext = createContext();

const HomeComponent = () => {
  return (
    <Fragment>
    <>
      <Slider />
      {/* Category, Search & Filter Section */}
      <section className="m-4 md:mx-8 md:my-6">
        <ProductCategory />
      </section>
      {/* Product Section */}
      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleProduct />
      </section>
      <div className="w-full bg-blue-900 pt-16 pb-24 text-center">
        <h4 className="text-3xl text-gray-100">Selling devices doesn't have to be difficult</h4>
        <p className="text-lg text-gray-100 mt-2">Heyshop makes it easy to sell/swap your devices with ease.</p>
        <div className="flex items-center justify-center mt-8">
          <a href="#" className="bg-yellow-800 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150">Sell device now</a>
        </div>
    </div>
    <div className="min-h-full pb-12">
      <div className="w-full 2xl:w-3/4 flex items-center justify-center px-8 md:px-32 lg:px-16 2xl:px-0 mx-auto -mt-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-2xl rounded-lg py-4">
                  <p className="text-3xl text-center font-bold text-yellow-800">Sell device</p>
                  <p className="text-center font-semibold h-32 p-8">
                      You only have to fill the form online, we review and make you an offer, once you agree, we pick up the device from your location and you get paid on the spot
                  </p>
                  <div className="flex items-center justify-center mt-6">
                      <a href="#" className="bg-yellow-800 hover:bg-blue-900 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150">Sell device</a>
                  </div>
              </div>
              <div className="bg-white shadow-2xl rounded-lg py-4">
                <p className="text-3xl text-center font-bold text-yellow-800">Swap device</p>
                  <p className="text-center font-semibold h-32 p-8">
                      You only have to fill the form online, we review your request and make you an offer, once you agree, we bring your new device to your location.
                  </p>
                  <div className="flex items-center justify-center mt-6">
                      <a href="#" className="bg-yellow-800 hover:bg-blue-900 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150">Swap device</a>
                  </div>
              </div>
              <div className="bg-white shadow-2xl rounded-lg py-4">
              <p className="text-3xl text-center font-bold text-yellow-800">Purchase Gadgets</p>
                  <p className="text-center font-semibold h-32 p-8">
                      You can select your preferred device from our wide array of devices and pay online. Deliveries usually take between 7 to 10 days.
                  </p>
                  <div className="flex items-center justify-center mt-6">
                      <a href="#" className="bg-yellow-800 hover:bg-blue-900 px-8 py-2 text-sm text-gray-200 uppercase rounded font-bold transition duration-150">Purchase a device</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div className="w-full flex flex-col items-center justify-center py-12 bg-gray-100">
    <h5 className="text-2xl text-center text-gray-900">Subscribe to receive our newsletter</h5>
  	<form class="m-4 flex flex-row w-full px-12 lg:px-48">
    	<input class="rounded-l-lg p-3 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-full" placeholder="your@mail.com"/>
		  <button class="px-8 rounded-r-lg bg-yellow-800 text-white font-bold p-3 border-yellow-800 border-t border-b border-r">Subscribe</button>
	</form>
</div>
  </>
    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
