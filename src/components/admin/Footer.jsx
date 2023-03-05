import './Footer.css'

const Footer = () => {
    return (
        <footer className="admin-footer">
            <div className="admin-container-fluid">
                <div className="admin-row admin-text-muted">
                    <div className="admin-col-6 admin-text-start">
                        <p className="admin-mb-0">
                            <strong>Phericcontas</strong> © 2023
                        </p>
                    </div>
                    <div className="admin-col-6 admin-text-end">
                        <ul className="admin-list-inline">
                            <li className="admin-list-inline-item">
                                <a
                                    className="admin-text-muted"
                                    href="https://adminkit.io/"
                                    target="_blank"
                                >
                                    Suporte
                                </a>
                            </li>
                            <li className="admin-list-inline-item">
                                <a
                                    className="text-muted"
                                    href="https://adminkit.io/"
                                    target="_blank"
                                >
                                    Centro de Ajuda
                                </a>
                            </li>
                            <li className="admin-list-inline-item">
                                <a
                                    className="text-muted"
                                    href="https://adminkit.io/"
                                    target="_blank"
                                >
                                    Privacidade
                                </a>
                            </li>
                            <li className="admin-list-inline-item">
                                <a
                                    className="text-muted"
                                    href="https://adminkit.io/"
                                    target="_blank"
                                >
                                    Termos
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