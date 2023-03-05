import './SubHeader.css'

const SubHeader = () => {
    return(
        <div className="sub-header sub-header-none">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-xs-12">
                        <ul className="left-info">
                            <li>
                                <a href="#">
                                    <i className="fa fa-clock-o" />
                                    Segunda-Sábado 09:00-17:00
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-phone" />
                                    +244 928 086 604
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className="right-icons">
                            <li>
                                <a href="#">
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
                </div>
            </div>
        </div>
    )
}

export default SubHeader