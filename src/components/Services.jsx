import { BsCalculator } from 'react-icons/bs'
import { GiCheckedShield } from 'react-icons/gi'
import { GrMoney } from 'react-icons/gr'
import { MdOutlineGroups } from 'react-icons/md'
import './Services.css'
import './SectionHeading.css'

import singleService1 from '../assets/images/single_service_01.jpg'
import singleService2 from '../assets/images/single_service_02.jpg'
import singleService3 from '../assets/images/single_service_03.jpg'

const Services = () => {
    return (
        <div className="services" id="services">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2 className='phone-size'>
                                Nossos <em>Serviços</em>
                            </h2>
                            <span>
                                Amplie seu negócio com nossas soluções especializadas.
                            </span>
                        </div>
                    </div>
                    <div className="col-md-6 admin-mb-5">
                        <div className="service-item service-item-01">
                            {/* <img
                                src={singleService1}
                                alt="análise de mercado"
                            /> */}
                            <div style={{ textAlign: 'center' }} className="down-content">
                                <BsCalculator style={{ fontSize: '4.8rem' }} />
                                <h4>Organização contabilística</h4>
                                <p>
                                    Organização de documentos; registo de informações
                                    contabilisticas; reconciliação bancária e contas a receber e a pagar.
                                </p>
                                {/* <a href="#" className="filled-button">
                                    Ler Mais
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 admin-mb-5">
                        <div className="service-item service-item-02">
                            {/* <img
                                src={singleService2}
                                alt="Dados financeiros"
                            /> */}
                            <div style={{ textAlign: 'center' }} className="down-content">
                                <GiCheckedShield style={{ fontSize: '4.8rem' }} />
                                <h4>Constituição e legalização de empresas</h4>
                                <p>
                                    Constituição legal de Empresas; alvará Comercial; certificado de habitabilidade; licenças comerciais válidas.
                                </p>
                                {/* <a href="#" className="filled-button">
                                    Ler mais
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 admin-mb-5">
                        <div className="service-item service-item-03">
                            {/* <img
                                src={singleService3}
                                alt="Serviço de Contabilidade"
                            /> */}
                            <div style={{ textAlign: 'center' }} className="down-content">
                                <GrMoney style={{ fontSize: '4.8rem' }} />
                                <h4>Consultoria fiscal</h4>
                                <p>
                                    Relatório de contas; mapas fiscais anuais; normativos fiscais; impostos periódicos; declarações a submeter à AGT.
                                </p>
                                {/* <a href="#" className="filled-button">
                                    Ler Mais
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 admin-mb-5">
                        <div className="service-item service-item-04">
                            {/* <img
                                src={singleService3}
                                alt="Serviço de Contabilidade"
                            /> */}
                            <div style={{ textAlign: 'center' }} className="down-content">
                                <MdOutlineGroups style={{ fontSize: '4.8rem' }} />
                                <h4>Gestão de recursos humanos</h4>
                                <p>
                                    Processamento de salário; elaboração de contractos; controlo de Segurança Social; processos disciplinares.
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
    )
}

export default Services