import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from "../../context/UserContext";
import Layout from '../Layout';

export default function Main({children}) {
    const { user } = useContext(UserContext);  
    if(!user || user === undefined){        
        window.location.replace("/sign-in");             
    }

    return (
      <>       
        <Layout>
          {children}
        </Layout>
        {/* <Footer />      */}
      </>
    );
}





