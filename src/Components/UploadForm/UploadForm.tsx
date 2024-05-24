import React, { useState } from "react";
import "./UploadForm.css"
import { Resumable, ResumableFile } from 'resumable-ts';
import axios from 'axios';

import validateInput from "../Validator";
import { title } from "process";

const mpaaRatings = ["G", "PG", "PG-13", "R", "NC-17"];
const acceptedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/x-matroska', 'video/webm'];

const UploadForm: React.FC = () => {

  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoTags, setVideoTags] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadErrorMsg, setUploadErrorMsg] = useState<string | null>(null);
  const [chunk, setChunksize] = useState(10485760);
  const [selectedRating, setSelectedRating] = useState("G");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleVideoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateInput(e.target.value))
      setVideoTitle(e.target.value);
  };

  const handleVideoDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideoDescription(e.target.value);
  };

  const handleVideoTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTags(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRating(e.target.value);
  };


  const isVideoFile = (file: File): boolean => {
    const res = acceptedTypes.includes(file.type);
    console.log("Debug : file type : ", file.type);
    return res;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files)
      return;
    const file = e.target.files[0];

    if (validateInput(file.name))
      setVideoTitle(file.name);
    else
      setVideoTitle("Видео");

    if (file && isVideoFile(file)) {
      setSelectedFile(file);
    }
    else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    setUploadErrorMsg(null);

    if (selectedFile == null) {
      setUploadErrorMsg("Файл не выбран");
      return;
    }

    if (videoTitle == '') {
      setUploadErrorMsg("Имя файла не задано");
      return;
    }

    const json = JSON.stringify({
      title: videoTitle,
      descrpt: videoDescription,
      age_rating: selectedRating
    });

    try {
      const response = await axios.post<{ token: string }>('http://localhost:8090/api/access', json);
      if (response.status !== 200) {
        setUploadErrorMsg("asdfa");
        return;
      }

      console.log(response.status);
      console.log("Debug : upload token value : ", response.data.token);

      const json2 = JSON.stringify(response.data.token, null, 2);
      console.log(json2);

      var r = new Resumable({
        target: `http://localhost:8090/api/upload`,
        testChunks: false,
        chunkSize: chunk,
        forceChunkSize: true,
        simultaneousUploads: 2,
        query: { json2 },
      });

      r.addFile(selectedFile, (target: ResumableFile) => {
        r.upload();
      });

      r.on("fileAdded", (target: ResumableFile) => {
        r.upload();
        setUploading(true);
      });

      r.on("fileSuccess", (target: ResumableFile) => {
        console.log("Debug : ResumableFile : sucessfully file uploaded");
        setUploading(false);
        setSelectedFile(null);
      });

      r.on("fileError", (target: ResumableFile) => {
        console.log("Debug : ResumableFile : error Uploading the file");
        setUploading(false);
      });

      r.on("fileProgress", (target: ResumableFile) => {
        setUploadProgress(100 * r.progress());
      });
    }
    catch (error: any) {
      console.log("Debug : axios execption : ", error);
    }
  };

  return <div className="Upload-form">
    <h2>Загрузить видео</h2>
    <input type="file"
      className='btn'
      accept={acceptedTypes.join(',')}
      onChange={handleFileChange} />
    <input type="text"
      placeholder="Название видео"
      value={videoTitle}
      onChange={handleVideoTitleChange} />
    <textarea placeholder="Описание видео"
      value={videoDescription}
      onChange={handleVideoDescriptionChange} />
    <div className="mpaa-select-container">
      <label htmlFor="mpaa-rating">Возрастной рейтинг: </label>
      <select id="mpaa-rating" value={selectedRating} onChange={handleChange}>
        {mpaaRatings.map(rating => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
    </div>
    <input type="text"
      placeholder="Теги видео"
      value={videoTags}
      onChange={handleVideoTagsChange} />
    <button className="Upload-button"
      onClick={handleUpload}
      disabled={!selectedFile || uploading}>
      {uploading ? "Загрузка..." : "Загрузить"}
    </button>
    {uploadProgress > 0 && uploadProgress < 100 && <progress className="Upload-progress" value={uploadProgress} max={100} />}
    {uploadProgress === 100 && <p className="Upload-success">Видео успешно загружено!</p>}
    {uploadErrorMsg != null && <p className="Upload-error">{uploadErrorMsg}</p>}
  </div>
}

export default UploadForm;