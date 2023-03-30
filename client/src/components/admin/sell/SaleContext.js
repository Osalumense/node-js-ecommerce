export const saleRequestState = {
    saleRequests: null,
    addProductModal: false,
    viewSaleRequest: {
      modal: false,
      sellId: "",
      name: "",
      address: "",
      images: null,
      amount: "",
      category: "",
      email: "",
      extraNotes: "",
      isSale: "",
      isSwap: "",
      offer: "",
      offerAmount: "",
      preferredDevice: "",
      status: "",
      whatsappContact: ""
    },
  };

export const saleRequestReducer = (state, action) => {
    switch (action.type) {
        /** Get all sale requests */
        case "fetchSaleRequestsAndChangeState":
            return {
                ...state,
                saleRequests: action.payload
            };
            case "viewSaleRequestModalOpen":
                return {
                  ...state,
                  viewSaleRequest: {
                    modal: true,
                    sellId: action.saleRequests.id,
                    name: action.saleRequests.name,
                    address: action.saleRequests.address,
                    images: action.saleRequests.images,
                    amount: action.saleRequests.amount,
                    category: action.saleRequests.category,
                    email: action.saleRequests.email,
                    extraNotes: action.saleRequests.extraNotes,
                    isSale: action.saleRequests.isSale,
                    isSwap: action.saleRequests.isSwap,
                    offer: action.saleRequests.offer,
                    deviceName: action.saleRequests.deviceName,
                    offerAmount: action.saleRequests.offerAmount,
                    preferredDevice: action.saleRequests.preferredDevice,
                    status: action.saleRequests.status,
                    whatsappContact: action.saleRequests.whatsappContact
                  },
                };
            case "viewSaleRequestModalClose":
                return {
                  ...state,
                  viewSaleRequest: {
                    modal: false,
                    sellId: "",
                    name: "",
                    address: "",
                    images: null,
                    amount: "",
                    category: "",
                    email: "",
                    extraNotes: "",
                    isSale: "",
                    isSwap: "",
                    offer: "",
                    offerAmount: "",
                    preferredDevice: "",
                    status: "",
                    whatsappContact: ""
                  },
                };
        default:
            return state;
    }
}