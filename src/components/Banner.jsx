import './Banner.css'

import Slider from './Slider'

const Banner = ({ bannerRef }) => {
    return (
        <div ref={bannerRef}>
            <Slider />
        </div>
    )
}

export default Banner