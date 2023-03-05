import './MoreInfo.css'

import moreInfo from '../assets/images/more-info.jpg'

const MoreInfo = () => {
    return(
        <div className="more-info" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="more-info-content">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="left-image">
                                        <img src={moreInfo} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-6 align-self-center">
                                    <div className="right-content">
                                        <span>Quem nós somos</span>
                                        <h2>
                                            Conheça <em>nossa empresa</em>
                                        </h2>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Nulla, dolorum laborum dolores enim repellendus perspiciatis
                                            maiores doloribus cupiditate, ullam similique quidem ex amet
                                            reprehenderit.
                                        </p>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                            Quae laboriosam eveniet reprehenderit earum?
                                        </p>
                                        <a href="#" className="filled-button">
                                            Ler Mais
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MoreInfo