import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Error from 'next/error'
import Error from "./_error";

export default function Home() {
  const [errorCode, setErrorCode] = useState<number>()
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('ACCESS_TOKEN')) {
      router.push("/tasks");
    }
    else {
      setErrorCode(401)
    }
    return () => { }
  }, [router])

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
}
