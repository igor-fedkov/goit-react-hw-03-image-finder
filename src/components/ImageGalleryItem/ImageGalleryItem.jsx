import {PropTypes} from 'prop-types'

const ImageGalleryItem = ({ webformatURL, tags }) => {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags}/>
    </li>
  )
}

ImageGalleryItem.protoTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired
}

export default ImageGalleryItem;