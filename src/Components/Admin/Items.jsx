import React, { useEffect, useState, useRef } from "react";
import {
    UpdateQuantity, GetItems, GetRestaurantItems, UploadPhoto, AddRestaurantItem, GetImages,
    DeleteRestaurantItem
} from "../../ApiService";
import { ToastContainer, toast } from "react-toastify";

export default function Items() {
    const currentUrl = window.location.href;
    const [images, setImages] = useState([]);
    const [restaurantItems, setRestaurantItems] = useState([]);
    const [items, setItems] = useState([]);
    const [restaurantItem, setItem] = useState({
        details: '',
        itemId: '',
        categoryId: '',
        categoryName: '',
        price: '',
        name: ''
    });
    const fileRef = useRef(null);
    const [priceAndId, setPrice] = useState({
        itemId: '',
        price: 0
    });
    const [detailsAndId, setDetails] = useState({
        itemId: '',
        details: ''
    });
    const getItems = async () => {
        const items = await GetItems();
        const restaurantItems = await GetRestaurantItems();
        setRestaurantItems(restaurantItems);
        const filteredItems = items.filter(
            item => !restaurantItems.some(restaurantItem => restaurantItem.name === item.name)
        );
        const updatedRestaurantItems = restaurantItems.concat(filteredItems);
        setRestaurantItems(updatedRestaurantItems);
        const response = await GetImages("RestaurantItem");
        setImages(response);
    };
    useEffect(() => {
        getItems();
    }, []);

    const handleFileChange = (e) => {
        fileRef.current = e?.target.files[0];
    };

    const handleUpload = async (name, id) => {
        if (fileRef.current === null) {
            toast.error("please select file before upload")
        } else {
            const newFile = new File([fileRef.current], name, {
                type: fileRef.current.type,
            });
            const formData = new FormData();
            formData.append("file", newFile);
            formData.append("isRestaurantItemImage", true);
            formData.append("restaurantItemId", id);
            return await UploadPhoto(formData);
        }
    };

    const handleInputchange = async (e, itemId) => {
        if ((priceAndId.itemId && priceAndId.itemId !== itemId) || (detailsAndId.itemId && detailsAndId.itemId !== itemId)) {
            toast.error("please add the previously edited item")
        } else {
            const { name, value } = e.target;
            if (name === "price") {
                setPrice({
                    itemId: itemId,
                    [name]: value
                })
                setRestaurantItems((prevItems) => prevItems.map((item) => item.id === itemId ?
                    { ...item, price: value } : item)
                )
            } else {
                setDetails({
                    itemId: itemId,
                    [name]: value
                })
                setRestaurantItems((prevItems) => prevItems.map((item) => item.id === itemId ?
                    { ...item, details: value } : item))
            }
        }
    }

    const onAddBtnClick = async (item) => {
        if ((priceAndId.itemId && priceAndId.itemId !== item.id) || (detailsAndId.itemId && detailsAndId.itemId !== item.id)) {
            alert('please edit price and details of single item first.')
        }
        else if (fileRef.current === null) {
            toast.error("please select file before upload")
        }
        else {
            const restaurantItem = {
                itemId: item.id,
                details: detailsAndId.details || item.details,
                name: item.name,
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                price: priceAndId.price || item.price,
            };
            const resultItem = await AddRestaurantItem(restaurantItem);
            if (resultItem === null) {
                toast.error("Item already exists");
            } else {
                const imageData = await handleUpload(resultItem.name, resultItem.id)
                if (imageData) {
                    setPrice({});
                    setDetails({});
                    getItems();
                }
            };
        }

        // 

    };

    const onDeleteClick = async (Id) => {
        const isDeleted = await DeleteRestaurantItem(Id);
        if (isDeleted) {
            await getItems();
        }
    };

    const UpdateQuantityFunc = async (itemId, number, quantity) => {
        if (quantity === 0 && number === -1) {
            toast.error("Item count is already zero, Please delete if you want to remoce the item.")
        } else {
            const updateQuantityDTO = {
                itemId: itemId,
                number: number,
                isRestaurantItem: true
            };
            await UpdateQuantity(updateQuantityDTO);
        }
        getItems();
    };

    return (
        <div>
            <ToastContainer
                hideProgressBar={true}
                newestOnTop={true}
                closeButton={false}
            />
            <div>
                {restaurantItems?.map((item, index) => {
                    const matchingImage = images?.find(
                        (image) => image.restaurantItemId === item.id
                    );
                    return (
                        <div className="flex restaurant-item">
                            <div className="item-details">
                                <h3>
                                    <b>{item.name}</b>
                                </h3>
                                <span className="rupee-sign">
                                    <i class="fas fa-rupee-sign"></i>
                                </span>
                                {item.quantity ? (
                                    <span>
                                        {item.price}
                                        <p>{item.details}</p>
                                        <button className="delete-btn" onClick={() => onDeleteClick(item.id)}>Delete</button>
                                    </span>
                                ) : (
                                    <div className="input-details">
                                        <input type="text" className="input-price" name="price" id="price" value={item.price}
                                            onChange={(e) => handleInputchange(e, item.id)} /> <br />
                                        <input type="text" className="input" name="details" id="details" value={item.details}
                                            priceRef onChange={(e) => handleInputchange(e, item.id)} />
                                    </div>

                                )
                                }


                            </div>
                            <div className="img-div">
                                {matchingImage ? (
                                    //below is the format to display base64 image where image/png can be replaced with any string
                                    <img className="dish-img" src={`data:image/png;base64,${matchingImage.imageData}`} alt="" />
                                ) : (
                                    <div className="admin-upload-div">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, item.name, item.id)}
                                        />
                                    </div>
                                )}
                                <span>
                                    {item.quantity ? (
                                        <div>
                                            {!matchingImage &&
                                                <button className="upload-btn" onClick={() => { handleUpload(item.name, item.id) }}>upload</button>
                                            }
                                            <div className="flex increase-decrease-div space-between item-add-btn">
                                                <button
                                                    onClick={() =>
                                                        UpdateQuantityFunc(
                                                            item.id,
                                                            -1,
                                                            item.quantity
                                                        )
                                                    }
                                                    className="small-btn minus-btn"
                                                >
                                                    -
                                                </button>
                                                <p className="quantity">
                                                    <b>{item.quantity}</b>
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        UpdateQuantityFunc(
                                                            item.id,
                                                            1,
                                                            item.quantity
                                                        )
                                                    }
                                                    className="small-btn plus-btn"
                                                >
                                                    <b>+</b>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => onAddBtnClick(item)}
                                            className="item-add-btn hv-bg-grey"
                                        >
                                            Add
                                        </button>
                                    )}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}