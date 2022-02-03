import React, {useState} from 'react';
import axios from 'axios';

function FileUploadComponent() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [message, setMessage] = useState("");


    function changeHandler(event) {
        console.log(event.target.files);
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    async function handleSubmit() {
        if (!isFilePicked) {
            console.log("No file selected");
            return;
        }

        let url = "http://localhost:8080/config/upload/v1";
        let formData = new FormData();
        formData.append('file', selectedFile);

        const resp = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).catch(error => {
            console.log(error);
        });

        console.log(resp);
        if (resp !== undefined) {
            setMessage(resp.data.message + " (" +  resp.data.status + ")");
        }
    }

    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            {isFilePicked ? (
                <div>
                    <p>Dateiname: {selectedFile.name}</p>
                    <p>Dateityp: {selectedFile.type}</p>
                    <p>Dateigröße (bytes): {selectedFile.size}</p>
                </div>
            ) : (
                <p>Bitte wählen Sie eine Datei</p>
            )}
            <div>
                <button onClick={handleSubmit} disabled={!isFilePicked}>Absenden</button>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default FileUploadComponent;