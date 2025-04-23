"use client";

import React from "react";
import { DataTableDemo } from "./dataTableDemo"; // ajuste le chemin si besoin

const Index = () => {
  return (
    <main className="flex flex-col px-5">
      <div className="flex">
        <h2 className="text-xl font-bold dark:text-white">Planning</h2>
      </div>
      <div className="flex flex-grow items-center justify-center overflow-x-hidden p-4">
        <div className="w-full">
          <DataTableDemo />
        </div>
      </div>
    </main>
  );
};

export default Index;
