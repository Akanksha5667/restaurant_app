import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { icecream } from "../../assets/biryani.png";
import pizza from "../../assets/shakes1.png";
import { GetCategories, UploadPhoto, GetImages, GetCategoryItems } from "../../ApiService";
import { useNavigate } from "react-router";

function ReactSlick() {
  const [categories, setCategories] = useState();
  const [images, setImages] = useState();
  const [imageData, setImageData] = useState(null);
  const navigate = useNavigate();
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2, // Number of slides to show per view
    slidesToScroll: 1, // Number of slides to scroll
    rows: 2, // Number of rows per slide
    slidesPerRow: 2, // Number of items per row
    initialSlide: 0,
    swipe: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
          slidesPerRow: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
          slidesPerRow: 1,
        },
      },
    ],
  };

  const fetchItems = async () => {
    const categories = await GetCategories();
    const images = await GetImages("category");
    setCategories(categories);
    setImages(images);
  };

  const onCategoryClick = async (id) => {
    navigate(`/category/${id}`);
  };

  const [file, setFile] = useState(null);
  const [filePreviews, setFilePreviews] = useState({});

  const handleFileChange = (e, itemId) => {
    const selectedFile = e?.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async (name, id) => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const newFileName = `${name} category`;
    const renamedFile = new File([file], newFileName, { type: file.type });
    const formData = new FormData();
    formData.append("file", renamedFile);
    formData.append("isCategoryImage", true);
    formData.append("CategoryId", id);

    try {
      const data = await UploadPhoto(formData);
      setImageData(data.retriveImage);
    } catch (error) {
      console.error("Upload Failed:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {categories?.map((item) => {
          const matchingImage = images?.find(
            (image) => image.categoryId === item.id
          );

          return (
            <div key={item.id}>
              <div
                className="slick-slide-item"
              >
                {matchingImage ? (
                    <img
                      src={`data:image/png;base64,${matchingImage.imageData}`}
                      onClick={()=>onCategoryClick(item.id)}
                      className="category-image"
                      alt={`${item.name} Preview`}
                    />
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, item.id)}
                    />
                    <button onClick={() => handleUpload(item.name, item.id)}>
                      Upload
                    </button>
                  </>
                )}
                <h3>{item.name}</h3>
              </div>
            </div>
          );
        })}
      </Slider>
      <div></div>
    </div>
  );
}

export default ReactSlick;
