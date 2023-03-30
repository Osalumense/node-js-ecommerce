import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";

import { cartListProduct } from "../partials/FetchApi";
import { getBrainTreeToken, getPaymentProcess, saveTransactionDetails, createOrder } from "./FetchApi";
import { fetchData, fetchbrainTree, pay } from "./Action";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

// import DropIn from "braintree-web-drop-in-react";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    clientToken: null,
    instance: {},
  });
  console.log(state);

  const checkoutOrder = async(response) => {
    let orderData = {
      allProduct: JSON.parse(localStorage.getItem("cart")),
      user: JSON.parse(localStorage.getItem("jwt")).user.id,
      amount: response.amount,
      transactionId: response.tx_ref,
      address: state.address,
      phone: state.phone,
    };
    try {
      let resposeData = await createOrder(orderData);
      if (resposeData.success) {
        localStorage.setItem("cart", JSON.stringify([]));
        dispatch({ type: "cartProduct", payload: null });
        dispatch({ type: "cartTotalCost", payload: null });
        dispatch({ type: "orderSuccess", payload: true });
        setState({ clientToken: "", instance: {} });
        dispatch({ type: "loading", payload: false });
        return history.push("/");
      } else if (resposeData.error) {
        console.log(resposeData.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const config = {
    // if(!state.address) {
    //   setState({ ...state, error: "Please provide your address" });
    // }
    public_key: process.env.REACT_APP_FLW_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: totalCost(),
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: JSON.parse(localStorage.getItem("jwt")).user.email,
      phone_number: JSON.parse(localStorage.getItem("jwt")).user.phoneNumber,
      name: JSON.parse(localStorage.getItem("jwt")).user.name,
    },
    customizations: {
      title: process.env.REACT_APP_NAME,
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response);
      saveTransaction(response);
      checkoutOrder(response);
      closePaymentModal()
    },
    onClose: () => {},
  };

  const saveTransaction = async(response) => {
    try {
      let responseData = await saveTransactionDetails({
        transactionId: response.transaction_id,
        transactionRef: response.tx_ref,
        status: response.status,
        amount: response.amount,
        flwReference: response.flw_ref,
        userId: JSON.parse(localStorage.getItem("jwt")).user.id
      });
      if (responseData.error) {
        console.log('An error occurred when saving payment details');
      } else if (responseData.success) {
        console.log('Payment details saved successfully');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    fetchbrainTree(getBrainTreeToken, setState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Please wait until finish
      </div>
    );
  }
  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl mx-2">Order</div>
        {/* Product List */}
        <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
          <div className="md:w-1/2">
            <CheckoutProducts products={data.cartProduct} />
          </div>
          <div className="w-full order-first md:order-last md:w-1/2">
          <Fragment>
                <div
                  onBlur={(e) => setState({ ...state, error: false })}
                  className="p-4 md:p-8"
                >
                  {state.error ? (
                    <div className="bg-red-200 py-2 px-4 rounded">
                      {state.error}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col py-2">
                    <label htmlFor="address" className="pb-2">
                      Delivery Address
                    </label>
                    <input
                      value={state.address}
                      onChange={(e) =>
                        setState({
                          ...state,
                          address: e.target.value,
                          error: false,
                        })
                      }
                      type="text"
                      id="address"
                      className="border px-4 py-2"
                      placeholder="Address..."
                    />
                  </div>
                  <div className="flex flex-col py-2 mb-2">
                    <label htmlFor="phone" className="pb-2">
                      Phone
                    </label>
                    <input
                      value={state.phone}
                      onChange={(e) =>
                        setState({
                          ...state,
                          phone: e.target.value,
                          error: false,
                        })
                      }
                      type="number"
                      id="phone"
                      className="border px-4 py-2"
                      placeholder="+880"
                    />
                  </div>
                  {/* <DropIn
                    options={{
                      authorization: state.clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => (state.instance = instance)}
                  /> */}
                  {/* <div
                    onClick={(e) =>
                      pay(
                        data,
                        dispatch,
                        state,
                        setState,
                        getPaymentProcess,
                        totalCost,
                        history
                      )
                    }
                    className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                    style={{ background: "#303031" }}
                  >
                    Pay now
                  </div> */}
                  {/* {(state.address !== '' && state.phone !== '') ? (
                    <>
                    <p>Not empty</p>
                    <p>address: {state.address}</p>
                    <p>phone: {state.phone}</p>
                    </>
                  ): (
                    <>
                    <p>Empty</p>
                    </>
                  )} */}
                  <FlutterWaveButton onClick={(e) =>
                      pay(
                        data,
                        dispatch,
                        state,
                        setState,
                        getPaymentProcess,
                        totalCost,
                        history
                      )
                    }
                    disabled={state.address === ""} className="w-full bg-gray-900 px-4 mt-5 py-2 text-center text-white font-semibold cursor-pointer" {...fwConfig} />
                </div>
                
              </Fragment>
            {/* {state.clientToken !== null ? (
              
            ) : (
              <div className="flex items-center justify-center py-12">
                <svg
                  className="w-12 h-12 animate-spin text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </div>
            )} */}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
              >
                <div className="md:flex md:items-center md:space-x-4">
                  <img
                    onClick={(e) => history.push(`/products/${product.id}`)}
                    className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                    src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                    alt={`${product.pName}`}
                  />
                  <div className="text-lg md:ml-6 truncate">
                    {product.pName}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Price : ₦{product.pPrice}{" "}
                  </div>
                  <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                    Quantitiy : {quantity(product.id)}
                  </div>
                  <div className="font-semibold text-gray-600 text-sm">
                    Subtotal : ₦{subTotal(product.id, product.pPrice)}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No product found for checkout</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
