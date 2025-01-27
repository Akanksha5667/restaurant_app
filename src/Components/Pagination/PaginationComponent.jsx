import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { GetImages, GetRestaurants, UploadPhoto,GetRestaurantsCount } from "../../ApiService";
import { useNavigate } from "react-router";
import { getDataFromDB, addDataToDB } from "../IndexedDB/InitDB";

const PaginationComponent = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
  const itemsPerPage = 10;
  const currentItems = restaurants;
  const navigate = useNavigate();
  // const [file, setFile] = useState(null);
  const [images, setImages] = useState();
  const [imageData, setImageData] = useState(null);
  const fileRef = useRef(null);
  const GetCount = async() =>{
    const count = await GetRestaurantsCount();
    setTotalPages(Math.ceil(count / itemsPerPage));
  }
  const fetchRestaurants = async (pagenumber) => {
    setCurrentPage(pagenumber);
    const paginationParameters={
      pageNumber:pagenumber,
      pageSize:10
    }
    const data = await GetRestaurants(paginationParameters);
    setRestaurants(data);
    const images_indexedDB = await getDataFromDB();
    if(images_indexedDB.length===0){
    const images = await GetImages("Restaurant");
    await addDataToDB({ id:"1",images});
    setImages(images);
    }else{
    setImages(images_indexedDB[0].images);
    console.log(images_indexedDB[1].string)
    }
  };

  useEffect(() => {
    const pagenumber=1;
    GetCount();
    fetchRestaurants(pagenumber);
  },[]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const onRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };
  const handleUpload = async (name, id) => {
    if (!fileRef) {
      alert("Please select a file first.");
      return;
    }
    const newFileName = `${name} restaurant`;
    const renamedFile = new File([fileRef.current], newFileName, { type: fileRef.current.type });
    const formData = new FormData();
    formData.append("file", renamedFile);
    formData.append("isRestaurantImage", true);
    formData.append("RestaurantId", id);

    try {
      const data = await UploadPhoto(formData);
      setImageData(data.retriveImage);
    } catch (error) {
      console.error("Upload Failed:", error);
    }
  };
  const handleFileChange = (e) => {
    fileRef.current = e?.target.files[0];
  };

  if ( images && totalPages === null) {
    // Loading state if totalPages is still being fetched
    return <div>Loading...</div>;
  }else{
  return (
    <div>
      <div className="grid">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {images && currentItems?.map((restaurant, index) => {
             const matchingImage = images?.find((image) => image.restaurantId === restaurant.id);
             return(
            
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Item
                className="grid-body"
              >
                <div>
                  {matchingImage ? (
                    <img  onClick={() => onRestaurantClick(restaurant.id)}
                      src={`data:image/png;base64,${matchingImage.imageData}`}
                      className="restaurant-image"
                      alt={`${restaurant.name} Preview`}
                    />
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, restaurant.id)}
                      />
                      <button
                        onClick={() =>
                          handleUpload(restaurant.name, restaurant.id)
                        }
                      >
                        Upload
                      </button>
                    </>
                  )}
                </div>
                <b>{restaurant.name}</b>
                <p>{restaurant.location}</p>
                <p>{restaurant.description}</p>
              </Item>
            </Grid>
          )})}
        </Grid>
      </div>
      <div className="pagination-div">
        <button
          className="page-button"
          disabled={currentPage <= 1}
            // onClick={() => setCurrentPage(currentPage - 1)}
          onClick={() => fetchRestaurants(currentPage - 1)}
        >
          Previous
        </button>
        {/* Page Numbers */}
        {totalPages > 0 && ([...Array(totalPages)]?.map((_, index) => {
          const pageNumber = index + 1;
          
          return (
            <button
              key={pageNumber}
              className={`page-button ${
                currentPage === pageNumber ? "active" : ""
              }`}
              onClick={() => fetchRestaurants(pageNumber)}
              // onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }))}
        <button
          className="page-button"
          disabled={currentPage >= totalPages}
          // onClick={() => setCurrentPage(currentPage + 1)}
          onClick={()=> fetchRestaurants(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
};
export default PaginationComponent;
