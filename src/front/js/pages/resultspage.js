import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { SearchResults } from "../component/searchresults";


export const ResultsPage = () => {

  const { store, actions } = useContext(Context);


    return (
      <div className="container">
        <div className="row d-flex">
    
          <div className="col-lg-12">
        <SearchResults />
        </div>
       
        </div>
        </div>
    )
}