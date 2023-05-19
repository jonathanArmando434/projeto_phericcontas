import './ContactUs.css'
import './SectionHeading.css'

const ContactUs = () => {
    return (
        <div className="contact-information callback-form" id="contactus">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2 className='phone-size'>
                                Entre em contato <em>Connosco</em>
                            </h2>
                            <span>
                                Estamos aqui para atender suas necessidades. Contate-nos!
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="contact-item">
                            <i className="fa fa-phone" />
                            <h4>Telefone</h4>
                            <p>
                                +244 928 086 604
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="contact-item">
                            <i className="fa fa-envelope" />
                            <h4>Email</h4>
                            <p>
                                pc.contabilidade012@hotmail.com
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="contact-item">
                            <i className="fa fa-map-marker" />
                            <h4>Loalização</h4>
                            <p>
                                Avenida comandante Valódia nº 236
                            </p>
                        </div>
                    </div>
                </div>
                <div id="contactus-form">
                    <div className="row contact-form d-flex" style={{ justifyContent: 'space-around' }} id="call-back-form">
                        <div className="col-md-5">
                            <div className="section-heading">
                                <h2 className='phone-size'>
                                    Solicitar uma <em>chamada de volta</em>
                                </h2>
                                <p>
                                    Uma maneira conveniente de obter suporte personalizado.

                                    Quando surge uma dúvida ou problema, nada melhor do que ter um suporte personalizado e direto. Com a opção de "Solicitar uma chamada de volta", você pode obter a ajuda necessária de forma ágil e eficiente. Basta preencher um formulário e aguardar o retorno de um especialista qualificado que irá entrar em contato para fornecer a assistência necessária.
                                </p>

                            </div>
                        </div>
                        {/* <div className='col-md-2' /> */}
                        <div className="col-md-5">
                            <form id="contact" action="" method="post">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Nome completo"
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
                                                placeholder="Endereço de e-mail"
                                                required=""
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input
                                                name="subject"
                                                type="text"
                                                className="form-control"
                                                id="subject"
                                                placeholder="Assunto"
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
                                                placeholder="Sua mensagem"
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
                                                className="border-button"
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
        </div>
    )
}

export default ContactUs