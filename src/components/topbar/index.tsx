import React from "react";
import { Separator } from "../ui/separator";


export default function TopBar() {


    return (
        <div className=" border-b-2 border-highlight h-28 flex justify-between items-center px-8 ">
        <div className="">
          <h1 className=" text-3xl">AKADEMIET</h1>
          <h2> UtlånsSystem</h2>
        </div>
        <div className="flex gap-2">
          <a href="/books">Bøker</a>
          <Separator orientation="vertical" /> 
          <a href="/students">Elever</a>
        </div>

      </div>
    )
}