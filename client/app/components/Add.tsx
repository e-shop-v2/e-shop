"use client";
import React from "react";

const Add = ({ seller }: { seller: any[] }) => {
  return (
    <div>
      <div>
        {seller.map((sel) => {
          return (
            <div>
              <h1>{sel.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Add;
