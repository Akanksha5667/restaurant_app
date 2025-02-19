import React, { useEffect, useState, useRef } from "react";
import {
  AddItemToCart,
  DeleteCartItem,
  GetImages,
  GetRestaurantItemsById,
  UploadPhoto,
} from "../../ApiService";
import { useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import {
  GetCartItems,
  UpdateQuantity,
  GetCategoryItems,
  GetRetaurantItemsOnSearch,
} from "../../ApiService";
import { useData } from "../../Auth/DataContext";

export default function OrderOnline() {
  const [restaurantItems, setRestaurantItems] = useState();
  const { name } = useParams();
  const currentUrl = window.location.href;
  const [images, setImages] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartRestaurantItemIds, setCartRestaurantItemIds] = useState([]);
  const [userId, setUserId] = useState();
  // const [quantity,setQuantity]=useState();
  const { id } = useParams();
  const fileRef = useRef(null);
  const { setCartItemsCount } = useData();
  const getRestaurantItems = async () => {
    let items;
    if (currentUrl.includes("category")) {
      items = await GetCategoryItems(id);
    } else if (currentUrl.includes("restaurant")) {
      items = await GetRestaurantItemsById(id);
    } else {
      items = await GetRetaurantItemsOnSearch(name);
    }
    setRestaurantItems(items);
    const response = await GetImages("RestaurantItem");
    setImages(response);
  };
  const fetchCartItems = async () => {
    const data = await GetCartItems();
    setCartItems(data);
    setCartItemsCount(data.length);
    const cartItem_RestaurantItemIds = data.map(
      (item) => item.restaurantItemId
    );
    setCartRestaurantItemIds(cartItem_RestaurantItemIds);
  };
  const fetchUserId = () => {
    const jwt = localStorage.getItem("token");
    const payload = jwtDecode(jwt);
    setUserId(
      payload[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
    );
  };
  useEffect(() => {
    getRestaurantItems();
    fetchCartItems();
    fetchUserId();
  }, []);

  const handleFileChange = (e) => {
    fileRef.current = e?.target.files[0];
  };
  const handleUpload = async (name, id) => {
    const newFile = new File([fileRef.current], name, {
      type: fileRef.current.type,
    });
    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("isRestaurantItemImage", true);
    formData.append("restaurantItemId", id);
    const response = await UploadPhoto(formData);
  };
  const onAddBtnClick = async (ItemId) => {
    const cartItem = {
      userId: userId,
      restaurantItemId: ItemId,
      quantity: 1,
    };
    const isAdded = await AddItemToCart(cartItem);
    if (isAdded) {
      fetchCartItems();
    }
  };

  const UpdateQuantityFunc = async (cartItemId, number, quantity) => {
    if (quantity === 1 && number === -1) {
      await DeleteCartItem(cartItemId);
    } else {
      const updateQuantityDTO = {
        cartItemId: cartItemId,
        number: number,
        isRestaurantItem: false
      };
      await UpdateQuantity(updateQuantityDTO);
    }
    fetchCartItems();

  };
  return (
    <div>
      <div className={currentUrl.includes("restaurant") ? "restaurant-items" : "height-700"}>
        {restaurantItems?.map((item, index) => {
          const matchingImage = images?.find(
            (image) => image.restaurantItemId === item.id
          );
          return (
            <div className="flex restaurant-item">
              <div className="img-div">
                {matchingImage ? (
                  //below is the format to display base64 image where image/png can be replaced with any string
                  <img className="dish-img" src={`data:image/png;base64,${matchingImage.imageData}`} alt="" />
                ) : (
                  <div className="upload-div">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e)}
                    />
                    <button
                      onClick={() =>
                        handleUpload(item.name, item.id)
                      }
                    >
                      Upload
                    </button>
                  </div>
                )}
                <span>
                  {cartRestaurantItemIds.includes(item.id) ? (
                    <div>
                      {(() => {
                        const cartItem = cartItems.find(
                          (cartItem) => cartItem.restaurantItemId === item.id
                        );
                        return (
                          <div className="flex increase-decrease-div space-between item-add-btn">
                            <button
                              onClick={() =>
                                UpdateQuantityFunc(
                                  cartItem.id,
                                  -1,
                                  cartItem.quantity
                                )
                              }
                              className="small-btn minus-btn"
                            >
                              -
                            </button>
                            <p className="quantity">
                              <b>{cartItem.quantity}</b>
                            </p>
                            <button
                              onClick={() =>
                                UpdateQuantityFunc(
                                  cartItem.id,
                                  1,
                                  cartItem.quantity
                                )
                              }
                              className="small-btn plus-btn"
                            >
                              <b>+</b>
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddBtnClick(item.id)}
                      className="item-add-btn hv-bg-grey"
                    >
                      Add
                    </button>
                  )}
                </span>
              </div>
              <div>
                <h3>
                  <b>{item.name}</b>
                </h3>
                <p><b>
                  {item.restaurantName}
                </b></p>
                <p>
                  <span className="rupee-sign">
                    <i class="fas fa-rupee-sign"></i>
                  </span>
                  {item.price}
                </p>
                <p>{item.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
