import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import SellMenu from "./sellMenu";
import SellTable from "./SellTable";
import { saleRequestState, saleRequestReducer } from "./SaleContext";


/* This context manage all of the products component's data */
export const SaleContext = createContext();

const SellComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <SellMenu />
      <SellTable />
    </div>
  );
};

const Sell = (props) => {
    const [data, dispatch] = useReducer(saleRequestReducer, saleRequestState);
    return (
      <Fragment>
        <SaleContext.Provider value={{ data, dispatch }}>
          <AdminLayout children={<SellComponent />} />
        </SaleContext.Provider>
      </Fragment>
    );
  };
  
  export default Sell;
