import {PropTypes} from 'prop-types'
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
	return (
		<ul className="ImageGallery" onClick={onClick}>
			{images.map(({ id, webformatURL, tags }) => 
				<ImageGalleryItem key={id.toString()} webformatURL={webformatURL} alt={tags} />)}
		</ul>
	)
}

ImageGallery.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			webformatURL: PropTypes.string.isRequired,
			tags: PropTypes.string.isRequired
		})
	),
	onClick: PropTypes.func
}

export default ImageGallery;