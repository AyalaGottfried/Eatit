import React from "react";
export function ImageUpload(props) {
    return (
        <label className="custom-file-upload upload-new-image-button">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = () => {
                        props.setImageSrc(reader.result);
                        props.setIsimageUploaded(true);
                    };
                }}
            />
            {props.type == "edit" ? "העלה תמונה חדשה" : "העלה תמונה"}
        </label>
    );
}
