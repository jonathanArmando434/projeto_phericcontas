import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../assets/images/phericcontas_logo.png'

import './Navbar.css'

const Navbar = () => {
    const [scrollWaited, setScrollWaited] = useState(false)
    const [current, setCurrent] = useState('')
    const [show, setShow] = useState(false)

    let canBgHeader

    const handleScroll = () => {
        const scrollPosition = window.scrollY; // => posição de rolagem
        if (scrollPosition >= 500) setScrollWaited(true)
        else setScrollWaited(false)
        whatIsCurrent(scrollPosition)
        console.log(scrollPosition);
    };
    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const whatIsCurrent = (scrollPosition) => {
        if (scrollPosition >= 0 && scrollPosition < 890) setCurrent('home')
        else if (scrollPosition >= 890 && scrollPosition < 2210) setCurrent('our-services')
        else if (scrollPosition >= 2210 && scrollPosition < 3560) setCurrent('about-us')
        else if (scrollPosition >= 3560) setCurrent('contact-us')
    }

    canBgHeader = (scrollWaited) ? 'background-header' : ''

    return (
        <header className={canBgHeader}>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <h2>Phericcontas</h2>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => {
                            setShow(!show)
                        }}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className={(show) ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className={(current === 'home') ? 'nav-link current' : 'nav-link'} href="#top"
                                    onClick={(e) => {
                                        e.preventDefault
                                        setShow(false)
                                    }}
                                >
                                    Início
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={(current === 'our-services') ? 'nav-link current' : 'nav-link'} href="#services"
                                    onClick={(e) => {
                                        e.preventDefault
                                        setShow(false)
                                    }}
                                >
                                    Nossos Serviços
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={(current === 'about-us') ? 'nav-link current' : 'nav-link'} href="#about"
                                    onClick={(e) => {
                                        e.preventDefault
                                        setShow(false)
                                    }}>
                                    Sobre Nós
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={(current === 'contact-us') ? 'nav-link current' : 'nav-link'} href="#contactus"
                                    onClick={(e) => {
                                        e.preventDefault
                                        setShow(false)
                                    }}>
                                    Contate-Nos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar