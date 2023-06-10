import { TbPhone, TbBrandWhatsapp } from 'react-icons/tb'
import { MdOutlineEmail, MdOutlinePlace } from 'react-icons/md'

import './Footer.css'

import logoPheric from '../assets/admin/img/icons/logo-pheric.png'

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row d-flex" style={{ justifyContent: 'space-around' }}>
                    <div className="col-md-3 footer-item">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3.5rem' }}>
                            <img src={logoPheric} alt="logo" className="logo-app" />
                            <h4 className='admin-align-middle'>Phericcontas</h4>
                        </div>
                        <p>
                            PRESTAÇÃO DE SERVIÇOS DE <br />CONTABILIDADE E
                            AUDITÓRIA, <br />LDA
                        </p>
                    </div>
                    <div className="col-md-4 footer-item">
                        <h4>Contatos</h4>
                        <ul className="menu-list">
                            <li>
                                <span>
                                    <span className='principal-color mr-2'>
                                        <TbPhone />
                                    </span>
                                    925955094 / 927791194
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span className='principal-color mr-2'>
                                        <TbBrandWhatsapp />
                                    </span>
                                    925955094
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span className='principal-color mr-2'>
                                        <MdOutlineEmail />
                                    </span>
                                    E-mail: pc.contabilidade012@hotmail.com
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span className='principal-color mr-2'>
                                        <MdOutlinePlace />
                                    </span>
                                    <span className='mr-2'>Angola-Luanda <br /></span>
                                    <span className='pl-18px'>Avenida comandante Valódia nº 236, <br /></span>
                                    <span className='pl-18px'>1º andar C - Luanda</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2 footer-item last-item">
                        <h4>Redes Sociais</h4>
                        <ul className="social-icons">
                            <li>
                                <a
                                    className='d-flex'
                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                    rel="nofollow"
                                >
                                    <i className="fa fa-facebook" style={{ fontSize: '1.4rem' }} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className='d-flex'
                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <i className="fa fa-instagram" style={{ fontSize: '1.4rem' }} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className='d-flex'
                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <i className="fa fa-linkedin" style={{ fontSize: '1.4rem' }} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className='d-flex'
                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <i className="fa fa-whatsapp" style={{ fontSize: '1.4rem' }} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer