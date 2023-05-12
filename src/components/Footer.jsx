import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row d-flex" style={{ justifyContent: 'space-around' }}>
                    <div className="col-md-3 footer-item">
                        <h4>Phericcontas</h4>
                        <p>
                            PRESTAÇÃO DE SERVIÇOS DE <br />CONTABILIDADE E
                            AUDITÓRIA, <br />LDA
                        </p>
                    </div>
                    <div className="col-md-4 footer-item">
                        <h4>Contatos</h4>
                        <ul className="menu-list">
                            <li>
                                <span>925955094 / 927791194</span>
                            </li>
                            <li>
                                <span>925955094</span>
                            </li>
                            <li>
                                <span>E-mail: pc.contabilidade012@hotmail.com</span>
                            </li>
                            <li>
                                <span>
                                    Angola-Luanda <br />
                                    Avenida comandante Valódia nº 236, <br />
                                    1º andar C - Luanda
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