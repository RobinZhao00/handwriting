import React, { useState, useEffect, useRef } from 'react';
import './style.scss';

const Upload = (props) => {
  const [multiple, setMultiple] = useState(false);
  const [files, setFiles] = useState(props.files);
  const inputEl = useRef(null);
  useEffect(() => {
    setMultiple(props.multiple);
  }, [props.multiple]);

  const handleClick = () => {
    inputEl.current.click();
  };

  const getBase64File = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    const result = {};
    if (!(file instanceof Blob)) {
      result.success = false;
      return resolve(result);
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      result.base64file = reader.result;
      result.originFile = file;
      result.originSize = file.size;
      result.success = true;
      resolve(result);
    };
    reader.onerror = error => reject(error);
  });

  const handleUpload = async (e, compressRatio = 0.9) => {
    const file = e.target.files[0];
    const { base64file, paddingTop, success } = await handleFile(file);
    if (!success) {
      return { success };
    }
    const { compressedBase64File } = await handleCompressFile(file, compressRatio);
    const origin = base64toBlob(base64file);
    const compress = base64toBlob(compressedBase64File);
    const originSize = (origin.size / 1000).toFixed(2);
    const compressSize = (compress.size / 1000).toFixed(2);
    const compressRate = `${((originSize - compressSize) / originSize * 100).toFixed(2)}%`;
    return {
      originStyle: {
        backgroundImage: `url(${base64file})`, paddingTop,
      }, compressStyle: {
        backgroundImage: `url(${compressedBase64File})`, paddingTop,
      }, originSize, compressSize, compressRate, base64file, compressedBase64File, success,
    };
  };

  const handleFile = async file => {
    const { originFile, base64file, originSize, success } = await getBase64File(file);
    if (!success) {
      return { success };
    }
    const { width, height } = await getImageParams(base64file);
    const paddingTop = `${height / width * 100}%`;
    return { originFile, base64file, originSize, width, height, paddingTop, success };
  };

  const handleCompressFile = async (file, compressRatio) => {
    const { base64file } = await getBase64File(file);
    const { width, height } = await getImageParams(base64file);
    const targetWidth = width * compressRatio;
    const targetHeight = height * compressRatio;
    // 创建Image 对象
    const image = new Image();
    image.src = base64file;
    // 创建画布
    // 创建画布
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    context.fillStyle = 'rgba(255,255,255,1)';
    context.fillRect(0, 0, targetWidth, targetHeight);
    context.drawImage(image, 0, 0, targetWidth, targetHeight);
    const compressedBase64File = canvas.toDataURL('image/jpeg', compressRatio);
    return { compressedBase64File };
  };

  const getImageParams = base64file => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64file;
    image.onload = function() {
      const width = this.width;
      const height = this.height;
      resolve({ width, height });
    };
    image.onerror = error => reject(error);
  });

  const base64toBlob = (base64file, contentType = 'image/jpg', sliceSize = 512) => {
    // 参考 https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    const byteCharacters = atob(base64file.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  };


  const handleChange = async (e) => {
    const result = await handleUpload(e);
    const { base64file, success } = result;
    success && setFiles([...files, { url: base64file }]);
    inputEl.current.value = null;
  };
  return (<>
    <div className="upload-list">
      {files.map(file => (<div className="item item-image" key={file.uid}>
        {file.url ? <img src={file.url} alt='file'/> : null}
        <div className="btn-group">
          <div className="btn btn-preview">详情</div>
          <div className="btn btn-delete">删除</div>
        </div>
      </div>))}
      <div className="item item-upload" onClick={handleClick}>
        <input type="file" multiple={multiple} ref={inputEl} onChange={handleChange} />
        <div className="add"></div>
      </div>
    </div>
  </>);
};

export default Upload;
