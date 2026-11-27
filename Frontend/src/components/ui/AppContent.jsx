import useAuth from "@/hooks/useAuth";
import AppLoader from "./AppLoader";
import Router from "@/router/Router";
import { userAPI } from "@/services/auth";
import { useEffect, useState } from "react";

export default function AppContent() {
    const { isPending, data, status, fetchStatus } = useAuth() 
// const [isPending, setIsPending] = useState(true)
//     async function fetchData() {
//         try{
//             const res = await userAPI()
//             console.log(res)
//         }catch(error){
//             console.log(error)
//         }finally{
//             setIsPending(false)
//         }
//     }

    // useEffect(()=>{
    //     fetchData()
    // },[])

    return isPending ? <AppLoader /> : <Router />

}