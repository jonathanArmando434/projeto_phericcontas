import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css'

import logoPheric from '../assets/admin/img/icons/logo-pheric.png'

const Navbar = ({ bannerRef, servicesRef, moreInfoRef, contactUsRef }) => {
    // const [scrollWaited, setScrollWaited] = useState(false)
    const [current, setCurrent] = useState('')
    const [show, setShow] = useState(false)

    // const handleScroll = () => {
    //     const scrollPosition = window.scrollY; // => posição de rolagem
    //     if (scrollPosition >= 500) setScrollWaited(true)
    //     else setScrollWaited(true)
    //     // whatIsCurrent(scrollPosition)
    // };

    const handleClick = (e) => {
        if (e.target.id === 'menu-top') bannerRef.current.scrollIntoView({ behavior: 'smooth' })
        else if (e.target.id === 'menu-ourServices') servicesRef.current.scrollIntoView({ behavior: 'smooth' })
        else if (e.target.id === 'menu-moreInfo') moreInfoRef.current.scrollIntoView({ behavior: 'smooth' })
        else if (e.target.id === 'menu-contactUs') contactUsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        // handleScroll();
        // window.addEventListener("scroll", handleScroll);
        document.addEventListener('click', handleClick)
        return () => {
            // window.removeEventListener("scroll", handleScroll);
            document.removeEventListener('click', handleClick)
        };
    }, []);

    // const whatIsCurrent = (scrollPosition) => {
    //     if (scrollPosition >= 0 && scrollPosition < 890) setCurrent('home')
    //     else if (scrollPosition >= 890 && scrollPosition < 2210) setCurrent('our-services')
    //     else if (scrollPosition >= 2210 && scrollPosition < 3560) setCurrent('about-us')
    //     else if (scrollPosition >= 3560) setCurrent('contact-us')
    // }

    return (
        <header className={'background-header'}>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand">
                        <img src={logoPheric} alt="logo" className="logo-app" />
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
                                <a className={(current === 'home') ? 'nav-link' : 'nav-link'} href="#top"
                                    onClick={(e) => {
                                        e.preventDefault
                                        setShow(false)
                                    }}
                                    id='menu-top'
                                >
                                    Início
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={(current === 'our-services') ? 'nav-link' : 'nav-link'} href="#services"
                                    onClick={(e) => {
                                        e.preventDefault
                                        setShow(false)
                                    }}
                                    id='menu-ourServices'
                                >
                                    Nossos Serviços
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={(current === 'about-us') ? 'nav-link' : 'nav-link'} href="#about"
                                    onClick={(e) => {
                                        e.preventDefault
                                        setShow(false)
                                    }}
                                    id='menu-moreInfo'
                                >
                                    Sobre Nós
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={(current === 'contact-us') ? 'nav-link' : 'nav-link'} href="#contactus"
                                    onClick={(e) => {
                                        e.preventDefault
                                        setShow(false)
                                    }}
                                    id='menu-contactUs'
                                >
                                    Contate-Nos
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link'} href="#contactus"
                                    to={'/admin/entrar'}
                                    id='menu-contactUs'
                               >
                                    Contate-Nos
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar