import React, { Fragment, useState, useContext, useEffect } from "react";
import ModalImage from "react-modal-image";
import './style.css';
import { editRequest, getAllRequests } from "./FetchApi";
import { SaleContext } from "./index";
const apiURL = process.env.REACT_APP_API_URL;



const ViewSaleRequest = (props) => {
    const { data, dispatch } = useContext(SaleContext);
    
    // const [loading, setLoading ] = useState(false);
  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [editformData, setEditformdata] = useState({
    sellId: "",
    name: "",
    amount: "",
    extraNotes: "",
    images: null,
    isSale: "",
    isSwap: "",
    category: "",
    offerAmount: "",
    offer: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    setEditformdata({
      sellId: data.viewSaleRequest.sellId,
      name: data.viewSaleRequest.name,
      email: data.viewSaleRequest.email,
      whatsappContact: data.viewSaleRequest.whatsappContact,
      preferredDevice: data.viewSaleRequest.preferredDevice,
      address: data.viewSaleRequest.address,
      status: data.viewSaleRequest.status,
      amount: data.viewSaleRequest.amount,
      extraNotes: data.viewSaleRequest.extraNotes,
      images: data.viewSaleRequest.images,
      isSale: data.viewSaleRequest.isSale,
      isSwap: data.viewSaleRequest.isSwap,
      deviceName: data.viewSaleRequest.deviceName,
      category: data.viewSaleRequest.category,
      offerAmount: data.viewSaleRequest.offerAmount,
      offer: data.viewSaleRequest.offer
    });
  }, [data.viewSaleRequest]);
  // console.log('selllll dattta ^^^ ', data);

  const fetchData = async () => {
    let responseData = await getAllRequests();
    if (responseData && responseData.saleRequests) {
      dispatch({
        type: "fetchProductsAndChangeState",
        payload: responseData.saleRequests,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let responseData = await editRequest(editformData);
      if (responseData.success) {
        fetchData();
        setEditformdata({ ...editformData, success: responseData.success });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            success: responseData.success,
          });
        }, 2000);
      } else if (responseData.error) {
        setEditformdata({ ...editformData, error: responseData.error });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            error: responseData.error,
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <>
      <div
        onClick={(e) =>
          dispatch({ type: "viewSaleRequestModalClose", payload: false })
        }
        className={`${
          data.viewSaleRequest.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.viewSaleRequest.modal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-4/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              View sale request
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "viewSaleRequestModalClose", payload: false })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <div class="grid md:grid-cols-2 py-4">
            <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Name</div>
                <div class="px-4 py-2">{editformData.name}</div>
            </div>
            <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Device Name</div>
                <div class="px-4 py-2">{editformData.deviceName}</div>
            </div>
            <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Amount</div>
                <div class="px-4 py-2">₦ {editformData.amount}</div>
            </div>
            <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Email</div>
                <div class="px-4 py-2">
                    <a class="text-blue-800" href={`${editformData.email}`}>{editformData.email}</a>
                </div>
            </div>
            <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Whatsapp No.</div>
                <div class="px-4 py-2">{editformData.whatsappContact}</div>
            </div>
            <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Address</div>
                <div class="px-4 py-2">{editformData.address}</div>
            </div>
            <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Preferred Device</div>
                <div class="px-4 py-2">{editformData.preferredDevice}</div>
            </div>
            <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Status</div>
                <div class="px-4 py-2">{editformData.status}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Sale type </div>
              <div class="px-4 py-2">
                {editformData.isSwap === true ? (
                  <span class="bg-green-500 w-1/4 py-1 px-2 rounded text-white text-sm text-center">Swap</span>
                ) : (
                  <span class="bg-red-500 w-1/4 py-1 px-2 rounded text-white text-sm text-center">Sale</span>
                )}
              </div>
                
            </div>

            <div className="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Extra Notes:</div>
              <div class="px-4 py-2">{editformData.extraNotes}</div>
              
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div class="px-4 py-2 font-semibold">Device images</div>
            <div className="flex justify-start space-x-3">
              {editformData.images ? (
                editformData.images.map((item, index) => (
                    <ModalImage
                        small={`${apiURL}/uploads/sell/${item}`}
                        large={`${apiURL}/uploads/sell/${item}`}
                        alt={`${item}`}
                        hideDownload={true}
                        className="modal-image"
                    />
                ))
                ) : (
                  ""
              )}
            </div>
          </div>
          {editformData.error ? alert(editformData.error, "red") : ""}
          {editformData.success ? alert(editformData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex flex-col space-x-1 py-4">
              <label htmlFor="offer">Make Offer (Amount) </label>
                <input
                  value={editformData.offerAmount}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      offerAmount: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="offerAmount"
                />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Reasons for Offer </label>
              <textarea
                value={editformData.offer}
                onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      offer: e.target.value,
                    })
                }
                className="px-4 py-2 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={2}
              />
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Make Offer
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </>
    </Fragment>
  );
};

export default ViewSaleRequest;
