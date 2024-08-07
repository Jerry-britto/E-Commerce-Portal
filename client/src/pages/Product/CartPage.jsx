import React, { useState, useEffect } from "react";
import CartItem from "../../components/Card/CartItem";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/verifyUser.js";

export default function CartPage() {
  const navigateUser = useNavigate();
  const [cart, setCart] = useState(0);

  useEffect(() => {
    // to check if the user is logged in or not
    const user = getUser();
    if (!user) {
      console.log("No Token found");
      navigateUser("/");
    }
    console.log("user at cart page ", user);
    setCart(user.carts.length);
  });

  const [data, setData] = useState([
    {
      imageLink:
        "https://t3.ftcdn.net/jpg/05/40/14/74/360_F_540147475_OcIoB8xl5mHXSglIwncqumokZ19hkmLp.jpg",
      price: 200,
      name: "Elite Boxing Gloves",
      qty: 1,
    },
    {
      imageLink:
        "https://media.istockphoto.com/id/1250685727/vector/realistic-pairs-of-red-boxing-gloves.jpg?s=612x612&w=0&k=20&c=8_bpUgjGLFEy5WKkRMEaKmdpW9MRQFt6Z7wZ-Fq0MSY=",
      price: 300,
      name: "Champion Boxing Gloves",
      qty: 200,
    },
    {
      imageLink:
        "https://anthonyjoshua.com/cdn/shop/articles/AJ_Fight_Insta_1.png?v=1662478898",
      price: 500,
      name: "Ultra Boxing Gloves",
      qty: 5,
    },
    {
      imageLink:
        "https://c8.alamy.com/comp/E03GP9/red-boxing-gloves-isolated-on-white-background-E03GP9.jpg",
      price: 450,
      name: "Golden Boxing Gloves",
      qty: 2,
    },
  ]);
  const [totalAmnt, setTotalAmt] = useState(0);

  useEffect(() => {
    (function () {
      let total = 0;
      for (let item of data) {
        total += item.qty * item.price;
      }
      setTotalAmt(total);
    })();
  }, [data]);

  const handleQtyChange = (event, idx) => {
    const newQty = parseInt(event.target.value);
    const updatedData = data.map((item, itr) =>
      itr === idx ? { ...item, qty: newQty } : item
    );
    setData(updatedData);
  };

  return (
    <div className="my-10">
      <h2 className="text-3xl font-semibold text-center mt-2">{`Total Items : ${cart}`}</h2>
      {cart === 0 ? (
        <div className=" font-bold text-6xl my-80 flex justify-center min-h-screen">
          No Items in the cart
        </div>
      ) : (
        <>
          {data.map((ele, idx) => (
            <CartItem
              key={ele.imageLink}
              coverImage={ele.imageLink}
              name={ele.name}
              qty={ele.qty}
              price={ele.price}
              onChange={(event) => handleQtyChange(event, idx)}
            />
          ))}
          <div className="text-3xl  text-center font-semibold">
            {`Total Amount: ${totalAmnt}`}
          </div>
        </>
      )}
    </div>
  );
}
