import React, { Component } from 'react';
import Slider from 'react-slick';

export default class SlideProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nav1: null,
      nav2: null,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        nav1: this.images,
        nav2: this.thumbs
      })
    }, 400);
  }


  render(){

    let { haveSlides, thumbnails, slide_images, proImg, proName } = this.props;
    let getSlidesToShow = !!thumbnails && thumbnails.length < 4 ? thumbnails.length : 4;


    const slide_images_settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      dot: false,
      fade: false,
      infinite: true,
      useTransform: true,
      speed: 500,
      cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />
    };
  
    function NextArrow(props){
      const { className, onClick } = props;
      return( <span className={className} onClick={onClick}><i className="fas fa-chevron-right"></i></span> )
    }
  
    function PrevArrow(props){
      const { className, onClick } = props;
      return( <span className={className} onClick={onClick}><i className="fas fa-chevron-left"></i></span> )
    }

    
    const slide_thumbs_settings = {
      slidesToShow: getSlidesToShow,
      slidesToScroll: 1,
      centerMode: false,
      focusOnSelect: true,
      arrows: false,
      rows: 1
    };

    
    
    return haveSlides
    ? <div className="pr-details__slides">
        <div className="slide_images">
          <Slider
            {...slide_images_settings}
            asNavFor={this.state.nav2}
            ref={slider => (this.images = slider)}
            // ref={slider => console.log(slider)}
          >
            {
              slide_images.map( (image, i) => 
                <div className="image" key = {i}>
                  <img src={image} alt={proName}/>
                </div>
              )
            }
          </Slider>
        </div>
        <div className="slide_thumbs">
          <Slider
            {...slide_thumbs_settings}
            asNavFor={this.state.nav1}
            ref={slider => (this.thumbs = slider)}
          >
            {
              thumbnails.map( (thumb, i) => 
                <div className="image" key = {i}>
                  <img src={thumb} alt={proName}/>
                </div>
              )
            }
          </Slider>
        </div>
      </div>
    : 
      <div className="pr-details__image">
        <img src={proImg} alt={proName}/>
      </div>
  }
}