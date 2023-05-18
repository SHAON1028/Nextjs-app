'use client'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import img1 from "../image/free-photo-of-bike-packed-with-flowers.jpeg"
import img2 from "../image/pexels-photo-14744773.jpeg"
import img3 from "../image/pexels-photo-1661179.jpeg"
function Slider() {
  return (
    <Carousel className='mt-5'>
      <Carousel.Item interval={500}>
        <Image
          className="d-block w-100"
          src={img3}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <Image
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className=" w-100"
          src={img1}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;