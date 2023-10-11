import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isToken } from "@/helpers/token";
import Error from "./_error";

export default function Home() {
  const [errorCode, setErrorCode] = useState<number>()
  const router = useRouter();

  useEffect(() => {
    isToken() ? router.push("/tasks") : setErrorCode(401);
  }, [router])

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
}
