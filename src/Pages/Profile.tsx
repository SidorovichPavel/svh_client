import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';

import Header from './Components/Header/Header';

import { Resumable, ResumableFile } from 'resumable-ts';

const ProfilePage: React.FC = () => {

    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoTags, setVideoTags] = useState('');

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [chunk, setChunksize] = useState(10485760);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleVideoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideoTitle(e.target.value);
    };

    const handleVideoDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVideoDescription(e.target.value);
    };

    const handleVideoTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideoTags(e.target.value);
    };

    const acceptedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv', 'video/x-matroska', 'video/webm',];

    const isVideoFile = (file: File): boolean => {
        console.log(file.type);
        const res = acceptedTypes.includes(file.type) && (file.name.match(/\.(avi|mp4|mkv|wmv|mov|webm)$/i) !== null);
        console.log("Debug : isVideoFile output : ", res);
        return res;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files)
            return;
        const file = e.target.files[0];

        if (file && isVideoFile(file)) {
            setSelectedFile(file);
        }
        else {
            setSelectedFile(null);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            var r = new Resumable({
                target: `http://localhost:8090/api/upload`,
                testChunks: false,
                chunkSize: chunk,
                forceChunkSize: true,
                simultaneousUploads: 2,
                query: { upload_token: selectedFile.name },
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
    };

    return (
        <div className="ProfilePage">
            <Header page_title='Личный кабинет' />
            <div className="LeftPane">
                <div className="Upload-form">
                    <h2>Загрузить видео</h2>
                    <input type="file" className='btn' accept={acceptedTypes.join(',')} onChange={handleFileChange} />
                    <input type="text" placeholder="Название видео" value={videoTitle} onChange={handleVideoTitleChange} />
                    <textarea placeholder="Описание видео" value={videoDescription} onChange={handleVideoDescriptionChange} />
                    <input type="text" placeholder="Теги видео" value={videoTags} onChange={handleVideoTagsChange} />
                    <button className="Upload-button" onClick={handleUpload} disabled={!selectedFile || uploading}>{uploading ? "Загрузка..." : "Загрузить"}</button>
                    {uploadProgress > 0 && uploadProgress < 100 && <progress className="Upload-progress" value={uploadProgress} max={100} />}
                    {uploadProgress === 100 && <p className="Upload-success">Видео успешно загружено!</p>}
                </div>
            </div>
            <div className="MiddlePane">
                {/* Здесь может быть контент для средней части экрана */}
            </div>
            <div className="RightPane">
                {/* Здесь может быть контент для правой части экрана */}
            </div>
        </div>
    );
};

export default ProfilePage;
