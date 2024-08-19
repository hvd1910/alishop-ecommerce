import React, { useEffect, useRef, useState } from 'react'
import { API_BASE_URL } from '../../../../config/apiConfig';
import DeleteIcon from '../../../../assets/images/icons/delete.svg'
import { ToastError, ToastSuccess } from '../notification/Notification';
import All_API from '../../../../State/Auth/All_API';
import EditIcon from '../../../../assets/images/icons/edit.svg'


const ImageProduct = ({idProduct, imageData, token, onLoad}) => {
    const [imgMain, setImgMain] = useState('error')
   
    const getImageSrc = () => {
        if (Array.isArray(imageData) && imageData.length > 0) {
            
          setImgMain(imageData[0].image_url)
        }
      };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];  
        const formData = new FormData();
        formData.append('files', selectedFile);      
        if(selectedFile.size> 0) {
            addImageProduct(formData)
        }else {
            ToastError("please try again")
        }
         
      };

      async function addImageProduct(imageData) {
        try{
          const response = await All_API.addImageProduct(idProduct, token, imageData )
          
          if(response.data.status === "success") {
              ToastSuccess(response.data.message)
              onLoad()
          }else {
              ToastError(response.data.message)
          }
        }catch {
          ToastError("please try again")
        }
      }

      async function deleteImageProduct(idImage) {
        try{
          const response = await All_API.deleteImageProduct(idImage)
          
          if(response.data.status === "success") {
              ToastSuccess(response.data.message)
              onLoad()
          }else {
              ToastError(response.data.message)
          }
        }catch {
          ToastError("please try again")
        }
      }



    useEffect(()=> {
    getImageSrc()
    }, [imageData])
  return (
    <div className="col-lg-4">
    <div className="ec-vendor-img-upload">
        <div className="ec-vendor-main-img">
            <div className="avatar-upload">
                <div className="avatar-edit">
                </div>
                <div className="avatar-preview ec-preview">
                    <div className="imagePreview ec-div-preview">
                        <img className="ec-image-preview"
                            src={`${API_BASE_URL}products/images/${imgMain}`}
                            alt="edit" />
                    </div>
                </div>
            </div>
            <div className="thumb-upload-set colo-md-12">
                {
                    Array.isArray(imageData) && imageData.length > 0 && imageData.map((image)=> (
                <div className="thumb-upload" key={image.id} onClick={()=> setImgMain(image.image_url)}>
                    <div className="thumb-edit" >
                        <input  onClick={()=> deleteImageProduct(image.id)}
                            className="ec-image-upload"
                             />
                        <label htmlFor="imageUpload" ><img 
                                src={DeleteIcon}
                                className="svg_img header_svg" alt="edit" /></label>
                    </div>
                    <div className="thumb-preview ec-preview">
                        <div className="image-thumb-preview">
                            <img className="image-thumb-preview ec-image-preview"
                                src={`${API_BASE_URL}products/images/${image.image_url}`}
                                alt="edit" />
                        </div>
                    </div>
                </div>
                    ))
                }
                {Array.isArray(imageData) && imageData.length < 6 &&
                    (     <div className="thumb-upload" >
                    <div className="thumb-edit">
                        <form action=""   >
                        <input type='file' id="thumbUpload01" name='file'
                            className="ec-image-upload"
                            accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
                        <label htmlFor="imageUpload"><img
                                src={EditIcon}
                                className="svg_img header_svg" alt="edit" /></label>
                        </form>
                    </div>
                    <div className="thumb-preview ec-preview">
                        <div className="image-thumb-preview">
                            <img className="image-thumb-preview ec-image-preview"
                                src={`${API_BASE_URL}products/images/notfound.png`}
                                alt="edit" />
                        </div>
                    </div>
                </div>)
                }
               
            </div>
        </div>
    </div>
</div>
  )
}

export default ImageProduct
