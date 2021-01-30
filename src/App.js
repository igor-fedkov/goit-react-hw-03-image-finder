import './App.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery'
import Button from './components/Button'
import LoaderSpiner from './components/LoaderSpiner'
import Modal from './components/Modal'

import {AlertNotice, ErrorNotice} from './components/Notice'
import apiImages from './services/api'

const imagesApiService = new apiImages();
// const STATUS = ['idle', 'loading', 'waiting', 'nothingFound', 'error'];
class App extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
      })
    ),
    searchQueryText: PropTypes.string,
    status: PropTypes.string,
    isModalShow: PropTypes.bool,
  }

  state = {
    images: [],
    searchQueryText: '',
    status: 'idle',
    isModalShow: false
  }

  modalImage = {};

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQueryText !== this.state.searchQueryText) {
      imagesApiService.setQuery(this.state.searchQueryText);
      this.loadData();
    }
  }

  onSearchQuerySubmit = (searchQueryText) => {
    this.setState(
      {
        searchQueryText,
        images: []
      }
    )
  }

  loadData = () => {
    this.setState({
      status: 'loading'
    })

    imagesApiService.getImages()
      .then(response => {
        // console.log(response);
        if (response.status === 200) {
          return response.data;
        }

        // return Promise.reject(new Error(`Нет картинок по запросу ${this.state.searchQueryText}`));
      })
      .then(data => {
        if (data.totalHits === 0) {
          return (            
            this.setState({
              status: 'nothingFound'
            })
          )
        }

        this.setState(state => 
        ({
          images: [...state.images, ...data.hits],
          status: 'waiting'
        }))

        if (this.state.images.length === data.totalHits) {
          this.setState({
            status: 'idle'
          })
        }

        if (imagesApiService.getPageNumber() > 2) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      }) 
      .catch((error) => {
        console.log(error);
        this.setState({
          status: 'error'
        })
      })
  }

  onImageClick = ({target}) => {
    if (target.tagName !== 'IMG') {
      return;
    }

    const { images } = this.state;
    
    this.modalImage = images.find(({ webformatURL }) =>
      webformatURL === target.src
    );

    this.togleModal();
  }

  togleModal = () => {
    this.setState(({isModalShow}) => ({
      isModalShow: !isModalShow
    }))
  }

  render() {
    const { images, status, isModalShow } = this.state;

    return (
      <div>
        <Searchbar onSearchQuerySubmit={this.onSearchQuerySubmit} />

        <ImageGallery images={images} onClick={this.onImageClick} />

        {status === 'nothingFound' && <AlertNotice text={'Nothing Found'} />}

        {status === 'error' && <ErrorNotice text={'Something went wrong. Please try again later.'} />}

        {status === 'loading' && <LoaderSpiner />}

        {status === 'waiting' && <Button onClick={this.loadData} />}
                
        {isModalShow &&
          <Modal onClose={this.togleModal}>
            <img src={this.modalImage.largeImageURL} alt={this.modalImage.tags} />
          </Modal>}
      </div>
    );
  }
}

export default App;