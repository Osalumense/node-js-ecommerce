import React, { Fragment, useState, useEffect } from "react";
import Layout from "../layout";
import { HashLink } from 'react-router-hash-link';
import { getAllCategory, saveSellRequest } from './FetchApi';


const SellComponent = () => {
    const [selected, setSelected] = useState("");
    const changeHandler = e => {
        setSelected(e.target.value);
        if(e.target.value == 'isSale') {
            setFdata({
            ...fData,
            error: false,
            success: false,
            isSale: true,
            isSwap: "",
            preferredDevice: ""
            })
        }
        else if(e.target.value == 'isSwap') {
            setFdata({
            ...fData,
            error: false,
            success: false,
            isSwap: true,
            isSale: ""
            })
        } 
    };
    useEffect(() => {
        fetchCategoryData();
        }, []);

        const [allCat, setAllCat] = useState({});
        const fetchCategoryData = async () => {
        let responseData = await getAllCategory();
        if (responseData.Categories) {
            setAllCat(responseData.Categories);
        }
    };
    const [fData, setFdata] = useState({
        name: "",
        email: "",
        whatsAppContact: "",
        address: "",
        isSale: "",
        isSwap: "",
        preferredDevice: "",
        category: "",
        deviceName: "",
        pImages: null,
        amount: "",
        extraNotes: ""
    });

    const submitForm = async (e) => {
        e.preventDefault();    
        if (!fData.pImages) {
          setFdata({ ...fData, error: "Please upload at least 2 image" });
          setTimeout(() => {
            setFdata({ ...fData, error: false });
          }, 2000);
        }
    
        try {
          let responseData = await saveSellRequest(fData);
          if (responseData.success) {
            setSelected("")
            setFdata({
              ...fData,
              name: "",
              email: "",
              whatsAppContact: "",
              address: "",
              isSale: "",
              isSwap: "",
              preferredDevice: "",
              category: "",
              pImages: null,
              amount: "",
              deviceName: "",
              extraNotes: "",
              success: responseData.success,
              error: false
            });
            setTimeout(() => {
              setFdata({
                ...fData,
                name: "",
                email: "",
                whatsAppContact: "",
                address: "",
                isSale: "",
                isSwap: "",
                preferredDevice: "",
                category: "",
                deviceName: "",
                pImages: null,
                amount: "",
                extraNotes: "",
                success: false,
                error: false,
              });
            }, 2000);
          } else if (responseData.error) {
            setFdata({ ...fData, success: false, error: responseData.error });
            setTimeout(() => {
              return setFdata({ ...fData, error: false, success: false });
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        }
    };

    const alert = (msg, type) => (
        <div className={`text-lg text-${type}-500`}>{msg}</div>
    );
  return (
    <>
        <section className="py-32 mt-12 flex items-center justify-center sell-bg">
            <div className="mx-auto max-w-[43rem]">
                <div className="text-center text-white">
                <p className="text-lg font-medium leading-8 text-blue-900">Introducing HeyShop</p>
                <h1 className="mt-3 text-4xl leading-[4rem] tracking-tight font-black">Sell or Swap devices with ease</h1>
                <p className="mt-3 text-lg leading-relaxed text-slate-400">Sell devices with ease.</p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
                <HashLink smooth to="#sellForm" className="transform rounded-md bg-yellow-800 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-900">Sell device now</HashLink>
                </div>
            </div>
        </section>
        <div className="text-gray-600 bg-gray-50 body-font relative mt-4 border-2">
            
            <div class="px-3 md:px-24 border-b py-20 bg-opacity-10 shadow-xl">
            <h1 className="font-bold text-3xl text-gray-900 text-center">How it works</h1>
                <div class="grid grid-cols-1 md:grid-cols-3 group shadow-neutral-100">
                    <div
                        class="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                        <span class="p-5 rounded-full bg-red-500 text-white shadow-lg shadow-red-200"><svg
                                xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg></span>
                        <p class="text-xl font-medium text-slate-700 mt-3">Upload your device</p>
                        <p class="mt-2 text-sm text-slate-500">Upload the details about the device you want to sell.</p>
                    </div>

                    <div
                        class="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                        <span class="p-5 rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200"><svg
                                xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="1.5">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg></span>
                        <p class="text-xl font-medium text-slate-700 mt-3">Get an offer within a few hours</p>
                        <p class="mt-2 text-sm text-slate-500">From your description we give an offer.</p>
                    </div>

                    <div class="p-10 flex flex-col items-center text-center group   md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
                        <span class="p-5 rounded-full bg-yellow-500 text-white shadow-lg shadow-yellow-200"><svg
                                xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg></span>
                        <p class="text-xl font-medium text-slate-700 mt-3">Get paid once we pickup the device</p>
                        <p class="mt-2 text-sm text-slate-500">We come to pickup your device at your doorstep and you get paid.</p>
                    </div>
                </div>
                <div class="w-full bg-gray-800 text-white shadow-xl shadow-indigo-200 py-10 px-20 flex justify-between items-center">
                    <p class=" text-white"> <span className="text-4xl font-medium">Ready to sell your device ?</span> <br/> <span className="text-lg">Fill out the form now! </span></p>
                    <HashLink smooth to="#sellForm" className="transform rounded-md bg-yellow-800 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-900">Sell now </HashLink>
                </div>
            </div>
            <section id="sellForm">
                <form>
                    <div className="container px-5 py-24 mx-auto flex justify-center">
                        <div className="md:w-2/3 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font">Sell your device</h2>
                        {fData.error ? alert(fData.error, "red") : ""}
                        {fData.success ? alert(fData.success, "green") : ""}
                        <div className="relative mb-4">
                            <label for="name" className="leading-7 text-sm text-gray-600">Your Name</label>
                            <input 
                                value={fData.name}
                                onChange={(e) =>
                                    setFdata({
                                    ...fData,
                                    error: false,
                                    success: false,
                                    name: e.target.value,
                                    })
                                }
                                type="text"
                                id="name" 
                                name="name" 
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
                        <div className="flex space-x-2 py-4">
                            <div className="w-1/2 mb-4">
                                <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input 
                                    value={fData.email}
                                    onChange={(e) =>
                                        setFdata({
                                        ...fData,
                                        error: false,
                                        success: false,
                                        email: e.target.value,
                                        })
                                    }
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                            <div className="w-1/2 mb-4">
                                <label for="phone" className="leading-7 text-sm text-gray-600">Whatsapp Contact:</label>
                                <input 
                                    value={fData.whatsAppContact}
                                    onChange={(e) =>
                                        setFdata({
                                        ...fData,
                                        error: false,
                                        success: false,
                                        whatsAppContact: e.target.value,
                                        })
                                    }
                                    type="text" 
                                    id="phone" 
                                    name="phone" 
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        
                        <div class="flex items-center mb-4 space-x-6">
                            <div class="flex items-center">
                                <input type="radio" value="isSwap" name="radio1" id="radioButton1" class="h-5 w-5" checked={selected === "isSwap"} onChange={changeHandler}
                                />
                                <label
                                for="isSwap" class="pl-3 text-base font-medium text-[#07074D]" >Swap device
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input type="radio" value="isSale" name="radio1" id="radioButton1" class="h-5 w-5" checked={selected === "isSale"} onChange={changeHandler}/>
                                <label
                                for="isSale" class="pl-3 text-base font-medium text-[#07074D]" >Sell device
                                </label>
                            </div>
                        </div>
                        {selected === 'isSwap' ?
                        <div className="relative mb-4">
                            <label for="preferredDevice" className="leading-7 text-sm text-gray-600">Preferred Device</label>
                            <input 
                                value={fData.preferredDevice}
                                onChange={(e) =>
                                    setFdata({
                                    ...fData,
                                    error: false,
                                    success: false,
                                    preferredDevice: e.target.value,
                                    })
                                }
                                type="text" 
                                id="preferredDevice" 
                                name="preferredDevice" 
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
                        : ''
                        }
                        <div className="relative mb-4">
                            <label for="address" className="leading-7 text-sm text-gray-600">Address</label>
                            <input
                                value={fData.address}
                                onChange={(e) =>
                                    setFdata({
                                    ...fData,
                                    error: false,
                                    success: false,
                                    address: e.target.value,
                                    })
                                }
                                type="text" 
                                id="address" 
                                name="address" 
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
                        <div className="flex flex-col mb-4">
                        <label htmlFor="image">Device Images/Video</label>
                        <input
                            onChange={(e) =>
                            setFdata({
                                ...fData,
                                error: false,
                                success: false,
                                pImages: [...e.target.files],
                            })
                            }
                            type="file"
                            accept=".jpg, .jpeg, .png, .mp4, .avi"
                            className="px-4 py-2 border focus:outline-none"
                            id="image"
                            multiple
                        />
                        </div>
                        <div className="flex space-x-2 py-4">
                            <div className="w-1/2 pb-4 flex flex-col space-y-1">
                                <label htmlFor="status">Device type</label>
                                <select
                                value={fData.category}
                                onChange={(e) =>
                                    setFdata({
                                    ...fData,
                                    error: false,
                                    success: false,
                                    category: e.target.value,
                                    })
                                }
                                name="status"
                                className="px-4 py-2 border focus:outline-none"
                                id="status"
                                >
                                <option value="">
                                    Select a category
                                </option>
                                {allCat.length > 0
                                    ? allCat.map(function (elem) {
                                        return (
                                        <option name="status" value={elem.id} key={elem.id}>
                                            {elem.cName}
                                        </option>
                                        );
                                    })
                                    : ""}
                                </select>
                            </div>
                            <div className="w-1/2 mb-4">
                                <label for="deviceName" className="leading-7 text-sm text-gray-600">Device Name</label>
                                <input 
                                    value={fData.deviceName}
                                    onChange={(e) =>
                                        setFdata({
                                        ...fData,
                                        error: false,
                                        success: false,
                                        deviceName: e.target.value,
                                        })
                                    }
                                    type="text" 
                                    id="deviceName" 
                                    name="deviceName" 
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        
                        <div className="relative mb-4">
                            <label for="amount" className="leading-7 text-sm text-gray-600">Amount:</label>
                            <input 
                                value={fData.amount}
                                onChange={(e) =>
                                    setFdata({
                                    ...fData,
                                    error: false,
                                    success: false,
                                    amount: e.target.value,
                                    })
                                }
                                type="number" 
                                id="amount" 
                                name="amount" 
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
                        <div className="relative mb-4">
                            <label for="message" className="leading-7 text-sm text-gray-600">Extra Notes</label>
                            <textarea 
                                value={fData.extraNotes}
                                onChange={(e) =>
                                    setFdata({
                                    ...fData,
                                    error: false,
                                    success: false,
                                    extraNotes: e.target.value,
                                    })
                                }
                                id="message" 
                                name="message" 
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        <div className="my-3">
                            {fData.error ? alert(fData.error, "red") : ""}
                            {fData.success ? alert(fData.success, "green") : ""}
                        </div>
                        
                        <button 
                            onClick={(e) => submitForm(e)}
                            className="text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-900 rounded text-lg">Send Message</button>
                        {/* <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p> */}
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </>
  )
}

const SellPage = (props) => {
    return (
      <Fragment>
          <Layout children={<SellComponent />} />
      </Fragment>
    );
  };

export default SellPage