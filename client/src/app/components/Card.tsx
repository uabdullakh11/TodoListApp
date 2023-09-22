"use client";
import { Task } from "./Task";
import React, { useEffect } from "react";
import { ITask } from "../types/types";
import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";


export default function Card({data}:any) {
  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <div>
      <div>
      {data && data.map((item: ITask, index: number) => (<Task id={item.id} key={index} name={item?.name} isCompleted={item.isCompleted} date={item.date} />))}
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  const res = await axios("https://jsonplaceholder.typicode.com/todos")

  if (!res.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {  res },
  }
};

// export const getStaticProps: GetStaticProps = async ()=>{
//   const res = await axios("https://jsonplaceholder.typicode.com/todos")
//   console.log(res)
//   return {props:{res}}
// }
