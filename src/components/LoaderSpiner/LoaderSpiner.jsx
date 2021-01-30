import Loader from 'react-loader-spinner'

const LoaderSpiner = () => {
  return (
    <div className="LoaderSpiner-container">
      <Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs  
      />
    </div>
  )    
}

export default LoaderSpiner;