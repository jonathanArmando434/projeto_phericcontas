import './Clients.css'
import './SectionHeading.css'

import client1 from '../assets/images/client-01.png'

import SliderClients from './SliderClients'

const Clients = () => {
    return (
        <div className="partners testimonials">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2 className='phone-size'>
                                Nossos <em>Clientes</em>
                            </h2>
                            <span>Conheça as empresas com quem já trabalhamos</span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <SliderClients />
                    </div>
                </div>
                <div className="row">
                    {/* <div className="col-md-12">
                        <div className="section-heading">
                            <h3>O que eles dizem sobre nós</h3>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="owl-testimonials owl-carousel">
                            <div className="testimonial-item">
                                <div className="inner-content">
                                    <h4>Jonathan-Armando Malungo</h4>
                                    <span>Analista financeiro chefe</span>
                                    <p>
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Nulla, dolorum laborum dolores enim repellendus perspiciatis
                                        maiores doloribus cupiditate."
                                    </p>
                                </div>
                                <img src="http://placehold.it/60x60" alt="" />
                            </div>
                            <div className="testimonial-item">
                                <div className="inner-content">
                                    <h4>Milicrisney Dos Santos</h4>
                                    <span>Especialista de mercado</span>
                                    <p>
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Nulla, dolorum laborum dolores enim repellendus perspiciatis
                                        maiores doloribus cupiditate."
                                    </p>
                                </div>
                                <img src="http://placehold.it/60x60" alt="" />
                            </div>
                            <div className="testimonial-item">
                                <div className="inner-content">
                                    <h4>Jonathan Malungo</h4>
                                    <span>Contador chefe</span>
                                    <p>
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Nulla, dolorum laborum dolores enim repellendus perspiciatis
                                        maiores doloribus cupiditate."
                                    </p>
                                </div>
                                <img src="http://placehold.it/60x60" alt="" />
                            </div>
                            <div className="testimonial-item">
                                <div className="inner-content">
                                    <h4>Milly Catuca Dos Santos</h4>
                                    <span>Chefe de marketing</span>
                                    <p>
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Nulla, dolorum laborum dolores enim repellendus perspiciatis
                                        maiores doloribus cupiditate."
                                    </p>
                                </div>
                                <img src="http://placehold.it/60x60" alt="" />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Clients