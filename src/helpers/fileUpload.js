export const fileUpload = async (file) => {

    if (!file) throw new Error('No existe archivo adjunto')

    const cloudUrl = `https://api.cloudinary.com/v1_1/dwgxgzzy3/image/upload`

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'journal-app')

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if (!resp.ok) throw new Error('No se pudo subir la imagen')

        const cloudResp = await resp.json()

        return cloudResp.secure_url

    } catch (err) {
        console.log(err)
        throw new Error(err.message)
    }
}