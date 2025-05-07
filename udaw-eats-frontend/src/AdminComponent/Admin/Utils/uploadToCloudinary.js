const upload_preset = "udaw-eats";
const cloud_name = "dmwy3upvv"
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);

    try {
        const res = await fetch(api_url, {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            throw new Error("Failed to upload image");
        }

        const fileData = await res.json(); 
        return fileData.url; 
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};