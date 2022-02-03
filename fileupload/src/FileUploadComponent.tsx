import React, {useState} from 'react';
import axios from 'axios';


function FileUploadComponent() {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [message, setMessage] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [name, setName] = useState("");


    function changeHandler(event: any) {
        console.log(event.target.files);
        setSelectedFile(event.target.files[0]);
        setName(event.target.files[0].name);
        setType(event.target.files[0].type);
        setSize(event.target.files[0].size);
        setIsFilePicked(true);
    }

    async function handleSubmit() {
        if (selectedFile === undefined) return;

        if (!isFilePicked) {
            console.log("No file selected");
            return;
        }

        let url = "http://localhost:8080/config/upload/v1";
        let formData = new FormData();

        // @ts-ignore
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


    // @ts-ignore
    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            {isFilePicked && selectedFile !== undefined && selectedFile !== null ? (
                <div>
                    <p>Dateiname: {name}</p>
                    <p>Dateityp: {type}</p>
                    <p>Dateigröße (bytes): {size}</p>
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