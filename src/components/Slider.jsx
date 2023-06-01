import { BsCheck } from 'react-icons/bs'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
};

const Carousel = () => {
    return (
        <Slider {...settings}>
            <div>
                <div className="main-banner header-text" id="top">
                    <div className="img-fill img-fill-1">
                        <div className="img-fill-bg-color">
                            <div className="text-content">
                                <h4>
                                    Nossos colaboradores
                                </h4>
                                <p>
                                    Os nossos colaboradores Têm as seguintes qualidades:
                                </p>
                                <p className="no-mb ml-4"><span className='principal-color'><BsCheck /></span> Especiapstas em suas áreas de atuação;</p>
                                <p className="no-mb ml-4"><span className='principal-color'><BsCheck /></span> Sólida formação acadêmica e profissional;</p>
                                <p className="no-mb ml-4"><span className='principal-color'><BsCheck /></span> Experiências em ambientes corporativos;</p>
                                <p className='ml-4'><span className='principal-color'><BsCheck /></span> Investimento constante em atuapzação e capacitação.</p>
                                <p>
                                    Você pode entrar em contato connosco clicando no botão abaixo.
                                </p>
                                <a href="#contactus-form" className="filled-button">
                                    Contacte-nos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="main-banner header-text" id="top">
                    <div className="img-fill img-fill-2">
                        <div className="img-fill-bg-color">
                            <div className="text-content">
                                <h4>
                                    Nossa missão
                                </h4>
                                <p>
                                    Para nós, a nossa missão não termina com a conclusão do nosso trabalho; este é apenas o ponto de partida. Acreditamos firmemente que a nossa missão verdadeira reside na total satisfação dos nossos clientes, que são a nossa maior prioridade.
                                </p>
                                <p>
                                    Você pode entrar em contato connosco clicando no botão abaixo.
                                </p>
                                <a href="#contactus-form" className="filled-button">
                                    Contacte-nos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="main-banner header-text" id="top">
                    <div className="img-fill img-fill-3">
                        <div className="img-fill-bg-color">
                            <div className="text-content">
                                <h4>
                                    Nós estamos prontos para ajudá-lo
                                </h4>
                                <p>
                                    Podemos criar um programa 100% customizado, para atender às necessidades da sua empresa. Desenvolveremos soluções que impulsionarão o seu negócio. Nosso compromisso é entregar um produto personalizado e de alta qualidade, alinhado com os objetivos da sua empresa.
                                </p>
                                <p>
                                    Você pode fazer um orçamento sem compromisso clicando no botão abaixo.
                                </p>
                                <a href="#contactus-form" className="filled-button">
                                    Contacte-nos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default Carousel;
