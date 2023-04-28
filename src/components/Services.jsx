import './Services.css'
import './SectionHeading.css'

import singleService1 from '../assets/images/single_service_01.jpg'
import singleService2 from '../assets/images/single_service_02.jpg'
import singleService3 from '../assets/images/single_service_03.jpg'

const Services = () => {
    return(
        <div className="services" id="services">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2 className='phone-size'>
                                Nossos <em>Serviços</em>
                            </h2>
                            <span>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="service-item">
                            {/* <img
                                src={singleService1}
                                alt="análise de mercado"
                            /> */}
                            <div style={{textAlign: 'center'}} className="down-content">
                                <h4>Contabilidade</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                {/* <a href="#" className="filled-button">
                                    Ler Mais
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="service-item">
                            {/* <img
                                src={singleService2}
                                alt="Dados financeiros"
                            /> */}
                            <div style={{textAlign: 'center'}} className="down-content">
                                <h4>Consultoria</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                {/* <a href="#" className="filled-button">
                                    Ler mais
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="service-item">
                            {/* <img
                                src={singleService3}
                                alt="Serviço de Contabilidade"
                            /> */}
                            <div style={{textAlign: 'center'}} className="down-content">
                                <h4>Auditoria</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                {/* <a href="#" className="filled-button">
                                    Ler Mais
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="service-item">
                            {/* <img
                                src={singleService3}
                                alt="Serviço de Contabilidade"
                            /> */}
                            <div style={{textAlign: 'center'}} className="down-content">
                                <h4>Auditoria</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                {/* <a href="#" className="filled-button">
                                    Ler Mais
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services