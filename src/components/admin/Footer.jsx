import { FaRegArrowAltCircleUp } from 'react-icons/fa'

import './Footer.css'

const Footer = ({arrowUp}) => {
    const handleScrollToUp = () => {
        arrowUp.current.scrollIntoView({ behavior: 'smooth' })
    }

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
                                    onClick={handleScrollToUp}
                                >
                                    <FaRegArrowAltCircleUp />
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