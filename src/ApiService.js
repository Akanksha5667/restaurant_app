import axios from "axios";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export const Register = async (data) => {
  const response = await axios.post(`${API_URL}user/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const GetUser = async (data) => {
  const response = await axios.post(`${API_URL}user/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const GetUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}user/GetAll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const GetById = async () => {
  const token = localStorage.getItem("token");
  const [Id] = useState(19);
  const response = await axios.get(`${API_URL}user/${Id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const IsTokenValid = async (token) => {
  const response = await axios.get(`${API_URL}user/isTokenValid/${token}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const GetRestaurants = async (paginationParameters) => {
  const response = await axios.post(`${API_URL}restaurant`,paginationParameters, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const GetRestaurantById = async (id) => {
  const response = await axios.get(`${API_URL}restaurant/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const GetRestaurantItems = async (id) => {
  const response = await axios.get(`${API_URL}restaurant/getItems/${id}`, {
    headers: {
      "content-type": "application/json",
    },
  });
  return response.data;
};

export const AddItemToCart = async (data) => {
  const response = await axios.post(`${API_URL}cart`, data, {
    headers: {
      "content-type": "application/json",
    },
  });
  return response.data;
};

export const GetCartItems = async () => {
  const response = await axios.get(`${API_URL}cart`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const UpdateQuantity = async (data) => {
  const response = await axios.post(`${API_URL}cart/updateQuantity`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const DeleteCartItem = async (id) => {
  const response = await axios.delete(`${API_URL}cart/DeleteCartItem/${id}`, {
    headers: {
      "content-type": "application/json",
    },
  });
  return response.data;
};

export const GetRetaurantItemsOnSearch = async (searchItem) => {
  const response = await axios.get(`${API_URL}restaurant/GetRetaurantItemsOnSearch/${searchItem}`, {
    headers: {
      "content-type": "application/json",
    },
  });
  return response.data;
};

export const GetRetaurantsOnSearch = async (searchItem) => {
  const response = await axios.get(`${API_URL}restaurant/GetRetaurantsOnSearch/${searchItem}`, {
    headers: {
      "content-type": "application/json",
    },
  });
  return response.data;
};


export const GetCategories = async () => {
  const response = await axios.get(`${API_URL}restaurant/categories`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const GetCategoryItems = async (id) => {
  const response = await axios.get(`${API_URL}restaurant/categoryItems/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const  UploadPhoto = async (formData) => {
const response = await axios.post(`${API_URL}restaurant/upload`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
return response.data;
};

export const GetImages = async (ImageType) => {
  const response = await axios.get(`${API_URL}restaurant/getImages/${ImageType}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const  Order = async (orderStatus) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}restaurant/PlaceOrder`, orderStatus, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
  };

  export const GetRestaurantsCount = async () => {
    const response = await axios.get(`${API_URL}restaurant/GetRestaurantsCount`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  export const GetOrders=async(userId)=>{
    const response = await axios.get(`${API_URL}restaurant/GetOrders/${userId}`,{
      headers:{
        "content-type":"application/json",
      }
    })
    return response.data;
  };