import './Footer.css'

const Footer = () => {
    return(
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 footer-item">
                        <h4>Phericcontas</h4>
                        <p>
                            Vivamus tellus mi. Nulla ne cursus elit,vulputate. Sed ne cursus
                            augue hasellus lacinia sapien vitae.
                        </p>
                        <ul className="social-icons">
                            <li>
                                <a
                                    rel="nofollow"
                                    href="https://fb.com/templatemo"
                                    target="_blank"
                                >
                                    <i className="fa fa-facebook" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-instagram" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-linkedin" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-whatsapp" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-item">
                        <h4>Links Úteis</h4>
                        <ul className="menu-list">
                            <li>
                                <a href="#">Serviço de contabilidade</a>
                            </li>
                            <li>
                                <a href="#">Serviço de consultoria</a>
                            </li>
                            <li>
                                <a href="#">Serviço de auditoria</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-item">
                        <h4>Páginas Adicionais</h4>
                        <ul className="menu-list">
                            <li>
                                <a href="#">Sobre Nós</a>
                            </li>
                            <li>
                                <a href="#">Como trabalhamos</a>
                            </li>
                            <li>
                                <a href="#">Política De Privacidade</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-item last-item">
                        <h4>Contate-Nos</h4>
                        <div className="contact-form">
                            <form id="contact footer-contact" action="" method="post">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Nome Completo"
                                                required=""
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input
                                                name="email"
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                pattern="[^ @]*@[^ @]*"
                                                placeholder="Endereço De E-mail"
                                                required=""
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <textarea
                                                name="message"
                                                rows={6}
                                                className="form-control"
                                                id="message"
                                                placeholder="Tua Mensagem"
                                                required=""
                                                defaultValue={""}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <button
                                                type="submit"
                                                id="form-submit"
                                                className="filled-button"
                                            >
                                            Enviar
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer