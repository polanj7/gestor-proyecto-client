import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from "../../context/UserContext";
import Layout from '../Layout';

//react-query
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export default function Main({children}) {
    const { user } = useContext(UserContext);  
    if(!user || user === undefined){        
        window.location.replace("/sign-in");             
    }

    return (
      <QueryClientProvider client={queryClient}>       
        <Layout>
          {children}
        </Layout>
        <ReactQueryDevtools/>
        {/* <Footer />      */}
      </QueryClientProvider>
    );
}





