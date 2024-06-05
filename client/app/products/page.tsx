import React from "react";

const page = async () => {
  async function getData() {
    const res = await fetch("http://localhost:8080/api/products/getAll");
    if (!res.ok) {
      throw new Error("failed");
    }
    return res.json();
  }
  const data = await getData();
  console.log(data);

  return (
    <div>
      <h1>hello </h1>
      {data.map((el: any) => {
        return (
          <div>
            <h3>{el.name}</h3>
            <img src={el.image} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default page;
