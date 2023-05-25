import { BsCalculator } from 'react-icons/bs'
import { GiCheckedShield } from 'react-icons/gi'
import { GrMoney } from 'react-icons/gr'
import { MdOutlineGroups } from 'react-icons/md'

import './Services.css'
import './SectionHeading.css'

const Services = ({ servicesRef }) => {
    return (
        <div className="services" id="services" ref={servicesRef}>
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
                            <div style={{ textAlign: 'center' }} className="down-content">
                                <BsCalculator style={{ fontSize: '4.8rem' }} />
                                <h4>Organização contabilística</h4>
                                <p>
                                    Organização de documentos; registo de informações
                                    contabilisticas; reconciliação bancária e contas a receber e a pagar.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 admin-mb-5">
                        <div className="service-item service-item-02">
                            <div style={{ textAlign: 'center' }} className="down-content">
                                <GiCheckedShield style={{ fontSize: '4.8rem' }} />
                                <h4>Constituição e legalização de empresas</h4>
                                <p>
                                    Constituição legal de Empresas; alvará Comercial; certificado de habitabilidade; licenças comerciais válidas.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 admin-mb-5">
                        <div className="service-item service-item-03">
                            <div style={{ textAlign: 'center' }} className="down-content">
                                <GrMoney style={{ fontSize: '4.8rem' }} />
                                <h4>Consultoria fiscal</h4>
                                <p>
                                    Relatório de contas; mapas fiscais anuais; normativos fiscais; impostos periódicos; declarações a submeter à AGT.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 admin-mb-5">
                        <div className="service-item service-item-04">
                            <div style={{ textAlign: 'center' }} className="down-content">
                                <MdOutlineGroups style={{ fontSize: '4.8rem' }} />
                                <h4>Gestão de recursos humanos</h4>
                                <p>
                                    Processamento de salário; elaboração de contractos; controlo de Segurança Social; processos disciplinares.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services