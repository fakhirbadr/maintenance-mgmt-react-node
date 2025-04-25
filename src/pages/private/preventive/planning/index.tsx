"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";
import { DataTableDemo } from "./dataTableDemo";
import DataTableCard from "./dataTableCard";

const Index = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <main className="flex flex-col px-5">
      <div className="flex">
        <h2 className="text-xl font-bold dark:text-white">Planning</h2>
      </div>
      <div className="flex flex-grow items-center justify-center overflow-x-hidden p-4">
        <div className="w-full">
          {isMobile ? <DataTableCard /> : <DataTableDemo />}
        </div>
      </div>
    </main>
  );
};

export default Index;
