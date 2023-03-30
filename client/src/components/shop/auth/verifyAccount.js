import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { verifyAccountReq, resendVerifyMailReq } from "./fetchApi";
// import { LayoutContext } from "../index";
import Layout from "../layout";
// useState, useContext


const VerifyComponent = () => {
  const { search } = useLocation();
  const token = search.split("=")[1]
  // return useMemo(() => new URLSearchParams(search), [search]);

  // let query = useQuery();
  // let token = query.get("token")
  // console.log("token >>>>> ",);
  // const { data: layoutData, dispatch: layoutDispatch } = useContext(
  //   LayoutContext
  // );

  const [data, setData] = useState({
    token: token,
    error: false,
    loading: true,
  });
  const [newData, setNewData] = useState({
    email: "",
    error: false,
    loading: true,
  });

  const alert = (msg, type) => (
    <div className={`text-lg text-${type}-500`}>{msg}</div>
  );


  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await verifyAccountReq({
        token: token,
      });
      console.log(responseData);
      if (responseData.error) {
        setData({...data, loading: false, error: responseData.error });
        console.log(data.error);
      } else if (responseData.success) {
        setData({ token: "", loading: false, error: false, success: responseData.success });
        console.log('data <<', data.success)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resendMail = async () => {
    console.log(newData);
    try {
      let responseData = await resendVerifyMailReq({
        email: newData.email,
      });
      console.log(responseData);
      if (responseData.newError) {
        setNewData({ email: "" });
        setData({...data, loading: false, error: responseData.newError });
      } else if (responseData.newSuccess) {
        setData({...data, loading: false, newSuccess: responseData.newSuccess });
        setNewData({ email: "", loading: false, error: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    formSubmit();
    // eslint-disable-next-line
  }, [token])
  
  // if(token) {
    
  // } else {
  //   console.log('No token provided')
  // }

  return (
    <Fragment>
      {/* <div className="text-center text-2xl mb-6">Login</div>
      {layoutData.loginSignupError ? (
        <div className="bg-red-200 py-2 px-4 rounded">
          You need to login for checkout. Haven't accont? Create new one.
        </div>
      ) : (
        ""
      )} */}
      {/* <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">
            Username or email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.email}
            type="text"
            id="name"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, password: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.password}
            type="password"
            id="password"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="block text-gray-600" href="/">
            Lost your password?
          </a>
        </div>
        <div
          onClick={(e) => formSubmit()}
          style={{ background: "#303031" }}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer"
        >
          Login
        </div>
      </form> */}
      {/* <section className="text-gray-600 body-font relative mt-20 bg-gray-100 border-2">
        <div>Let's verify your account</div>
      </section> */}
    <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-100 py-12">
      <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl p-8">
        <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div class="flex flex-col items-center justify-center text-center space-y-5">
            <div class="font-semibold text-3xl text-blue-900">
              <p>Email Verification</p>
            </div>
            
          </div>
          {data.success ?
            !data.error ? 
            <>
              <div class="flex flex-row text-gray-800">
                <p className="text-lg font-medium">Please wait while we verify your account</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-yellow-800 h-24 w-24 text-center mx-auto animate-spin" viewBox="0 0 24 24">
                <path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path>
              </svg>
            </>
           :
            <>
              <div class="flex flex-row text-gray-800">
                <p className="text-lg font-medium">Your account has been successfully verified</p>
              </div>
              <a href="/login" className="font-medium px-4 py-2 text-white w-full text-center cursor-pointer">Login</a>
            </>
            :
            <>
            <div class="flex flex-col space-y-5">
              <p className="font-semibold text-lg text-center">{}</p>
              <p className="font-semibold text-lg text-center">{data.newSuccess? alert(data.newSuccess, "green"): data.newError? alert(data.newError, "red"): alert(data.error, "red")}</p>
              <form className="space-y-4">
              {data.success ? alert(data.newSuccess, "green") : ""}
                <div className="flex flex-col">
                  <label htmlFor="name">
                    Email address
                    <span className="text-sm text-gray-600 ml-1">*</span>
                  </label>
                  <input
                    onChange={(e) => {
                      setNewData({ ...newData, email: e.target.value, error: false });
                    }}
                    value={newData.email}
                    type="email"
                    id="name"
                    placeholder="Enter your email address to get another verification mail"
                    className="px-4 py-2 focus:outline-none border"
                  />
                </div>
              </form>
              <div>
                <button
                onClick={(e) => resendMail()}
                style={{ background: "#303031" }}
                className="font-medium px-4 py-2 text-white w-full text-center cursor-pointer"
                >
                  Verify Account
                </button>
              </div>
            </div>
            </>
          }
          

          {/* <div>
            <form action="" method="post">
              <div class="flex flex-col space-y-16">
                <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div class="w-16 h-16">
                    <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                  </div>
                  <div class="w-16 h-16 ">
                    <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                  </div>
                  <div class="w-16 h-16 ">
                    <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                  </div>
                  <div class="w-16 h-16 ">
                    <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""/>
                  </div>
                </div>

                
              </div>
            </form>
          </div> */}
        </div>
      </div>
    </div>      
    </Fragment>
  );
};

const VerifyPage = (props) => {
  return (
    <Fragment>
        <Layout children={<VerifyComponent />} />
    </Fragment>
  );
};

export default VerifyPage;
