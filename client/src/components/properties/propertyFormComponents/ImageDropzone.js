import React from "react";
// import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import axios from "axios";
import uuid from "uuid";

const StyledDropzone = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.grey1};
  font-weight: 400;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;

  & p {
    margin: 0;
    color: #807880;
  }
`;

const UploadedImage = styled.img`
  width: 160px;
  height: 123px;
  margin: 3px;
  display: inline-block;
  border-radius: 4px;
`;

const ImageDropzone = ({
  handleNewImages,
  removeUploadedImage,
  formState: { images }
}) => {
  // new axios instance for image uploading without x-auth-token (CORS problems)
  const cloudinaryAxiosInstance = axios.create({});

  // overwrite axios default headers
  cloudinaryAxiosInstance.defaults.headers.common = {};
  // TODO limit number of images to 15
  const onDrop = async acceptedFiles => {
    const uploadedImages = await Promise.all(
      acceptedFiles.map(async file => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "houseflips");
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
        formData.append("timestamp", Date.now() / 1000);

        try {
          const res = await cloudinaryAxiosInstance.post(
            process.env.REACT_APP_CLOUDINARY_ENDPOINT,
            formData
          );

          const { data } = res;
          return data.secure_url;
        } catch (error) {
          console.log(error);
        }
      })
    );
    handleNewImages(uploadedImages);
    console.log(uploadedImages);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  return (
    <StyledDropzone {...getRootProps()} accept="image/jpeg">
      <input {...getInputProps()} />
      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop images here, or click to select up to 10 files...</p>
      )} */}
      {images.map((img, index) => (
        <UploadedImage
          src={img}
          alt={`Property image ${index + 1}`}
          key={uuid()}
          onClick={e => removeUploadedImage(e, index)}
        />
      ))}
    </StyledDropzone>
  );
};

ImageDropzone.propTypes = {};

export default ImageDropzone;
