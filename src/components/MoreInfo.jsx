import './MoreInfo.css'

import moreInfo from '../assets/images/more-info.jpg'

const MoreInfo = ({ moreInfoRef }) => {
    return (
        <div className="more-info" id="about" ref={moreInfoRef}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="more-info-content">
                            <div className="row">
                                <div className="col-md-6" style={{height: '100%'}}>
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
                                            A Phericcontas, Lda, surgiu no mercado angolano desde 2009,
                                            prestando serviços nas áreas de Contabilidade, Fiscalidade,
                                            Auditoria, e Recursos Humanos. Há mais de {new Date().getFullYear() - 2010} anos que
                                            apoiamos às Micro, Pequenas e Médias Empresas a
                                            desenvolverem as suas actividades financeiras e económicas.
                                        </p>
                                        <p>
                                            A actuação no segmento da consultoria em contabilidade
                                            permitiram-na adquirir know-how, para prestar melhor apoio às
                                            tomadas de decisões dos seus clientes e colaboradores, com
                                            relevância significativa no sucesso que estas têm alcançado.
                                        </p>
                                        {/* <a href="#" className="filled-button">
                                            Ler Mais
                                        </a> */}
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