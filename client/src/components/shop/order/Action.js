import { createOrder, saveTransactionDetails } from "./FetchApi";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { totalCost } from '../partials/Mixins';

export const fetchData = async (cartListProduct, dispatch) => {
  
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchbrainTree = async (getBrainTreeToken, setState) => {
  try {
    let responseData = await getBrainTreeToken();
    if (responseData && responseData) {
      setState({
        clientToken: responseData.clientToken,
        success: responseData.success,
      });
      console.log(responseData);
    }
  } catch (error) {
    console.log(error);
  }
};

export const pay = async (
  data,
  dispatch,
  state,
  setState,
  getPaymentProcess,
  totalCost,
  history
) => {
  console.log(state);
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
  } else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
  } else {
    let nonce;
    state.instance
      .requestPaymentMethod()
      .then((data) => {
        dispatch({ type: "loading", payload: true });
        nonce = data.nonce;
        let paymentData = {
          amountTotal: totalCost(),
          paymentMethod: nonce,
        };
        getPaymentProcess(paymentData)
          .then(async (res) => {
            if (res) {
              let orderData = {
                allProduct: JSON.parse(localStorage.getItem("cart")),
                user: JSON.parse(localStorage.getItem("jwt")).user.id,
                amount: res.transaction.amount,
                transactionId: res.transaction.id,
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
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        setState({ ...state, error: error.message });
      });
  }
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

export const payWithFlw = async (state, setState) => {
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
  } else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
  } else {
  const config = {
    public_key: process.env.REACT_APP_FLW_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: totalCost(),
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
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
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };
}
}
