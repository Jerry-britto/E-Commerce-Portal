import React, { useEffect, useState } from "react";
import Banner from "../../components/Home/Banner/Banner.jsx";
import Slide from "../../components/Home/Slide/Slide.jsx";
import Latest from "../../components/Home/Multi/Latest.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { setProductsData } from "../../store/slice.js";

export default function Home() {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadProducts = async () => {
    try {
      const productDetails = await Axios.get(
        "http://localhost:8000/api/v1/product"
      );
      const records = productDetails?.data;
      // console.log(records);
      setProducts(records);
      dispatch(
        setProductsData(
          records.higherViewProduct.concat(records.lowerViewProduct)
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (user && user.length > 0 && user[0]["isAdmin"]) {
      console.log("user is an admin");
      navigate("/admin");
    } else {
      loadProducts();
    }
  });

  return  (
    <div className="w-full min-h-screen bg-slate-200">
      <Banner />
      <Slide higherViewProducts={products.higherViewProduct} />
      <Latest lowerViewProducts={products.lowerViewProduct} />
    </div>
  );
}
