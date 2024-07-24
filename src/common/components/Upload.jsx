import React, { useState, useEffect, useRef } from 'react';

const Upload = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const inputRef = useRef(null)

  useEffect(() => {

  },[])
  const handleUpload = () => {
    inputRef.current.click()
  };
  return (<>
    <input type="file" ref={inputRef} accept="image/*"/>
    <div className="upload-container" onClick={handleUpload}>上传</div>
    {
      imageSrc && <img src={imageSrc} className="image-preview" alt="preview"/>
    }
  </>);
};


export default Upload;
