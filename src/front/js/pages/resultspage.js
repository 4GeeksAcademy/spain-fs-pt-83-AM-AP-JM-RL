import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { SearchResults } from "../component/searchresults";
import { SearchBar } from "../component/searchbar";


export const ResultsPage = () => {

  const { store, actions } = useContext(Context);


    return (
      <div className="container">
        {/* <div className="row">
          <div className="col-6">
            <SearchBar />
          </div>
        </div> */}
        <div className="row d-flex">
    
          <div className="col-lg-12">
        <SearchResults />
        </div>
       
        </div>
        </div>
    )
}