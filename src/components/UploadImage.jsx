import { useState } from "react"


const UploadImage = (props) => {

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    const uploadedImage = props.uploadedImage

    const imageUpload = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'fitnessimages')

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dqdcasuhj/image/upload', {
                method: 'POST',
                body: data
            })
            const file = await res.json()
            setImage(file.secure_url)
            uploadedImage(file.secure_url)
            setLoading(false)
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <section>
            <input
                type="file"
                id="image"
                name="image"
                placeholder="upload an image"
                onChange={imageUpload}
            />
            {loading ? <h2>Loading...</h2> : <img src={image} style={{ width: '300px' }} alt='' />}
        </section>
    )
}

export default UploadImage