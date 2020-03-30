import React, {Fragment, useState} from 'react';
//import FileUpload from 'express-fileupload';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState();
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile,setuploadedFile] = useState({});
    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
       // try{
            const res = await axios.post('/feed', formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            const{filename, filepath} =res.data;
            setuploadedFile({filename, filepath});
        // }catch(err){
        //     if(err.response. === 500){
        //         console.log("There was a problem with server");
        //     }
        //     else {
        //         console.log(err.response.data.msg);
        //     }
            
        // }
    };

    return(
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                    <input type='file' className='custom-file-input' id='customFile' onChange={onChange} />
                    <label className='custom-file-label' for='customFile'>
                        {filename}
                    </label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
            </form>
        </Fragment>
    );
};

export default FileUpload;