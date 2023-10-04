import { api } from "@/utils/axios/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


export default function Layout({ children }: { children: React.ReactNode }) {

  const router = useRouter();

  useEffect(() => {
    const getAccess = async () => {
      try {
        const auth = await api("api/users/")
        console.log(auth)
      }
      catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          console.log(err.response.data)
          if (err.response.data === "Unauthorized! Access Token was expired!") {
            const data  = {
              refreshToken: sessionStorage.getItem("REFRESH_TOKEN")
            }
            const res = await api.post("api/auth/refresh", {refreshToken: sessionStorage.getItem("REFRESH_TOKEN")})
            sessionStorage.setItem('ACCESS_TOKEN', res.data.ACCESS_TOKEN)
            sessionStorage.setItem('REFRESH_TOKEN', res.data.REFRESH_TOKEN)
          }
        }
      }
    }
    // getAccess()
  }, [])

  // useEffect(() => {
  //   if (!sessionStorage.getItem('ACCESS_TOKEN')) {
  //     router.push("/login");
  //   }
  //   return () => { }
  // }, [router])
  return <div className="wrapper">{children}</div>;
}
