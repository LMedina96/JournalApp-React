import { ImageList, ImageListItem } from "@mui/material";

const ImageGallery = ({images}) => {
    return (
        <ImageList sx={{ width: '100%', height: 'auto' }} cols={4} rowHeight={'auto'}>
          {images.map((image) => (
            <ImageListItem key={image}>
              <img
                srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${image}?w=164&h=164&fit=crop&auto=format`}
                alt="Imagen de la nota"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      );
    }

export default ImageGallery
