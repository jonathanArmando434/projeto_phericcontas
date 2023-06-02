import { useRef, useState, useEffect } from 'react'

import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/css/fontawesome.css'
import './Home.css'
import '../assets/css/owl.css'

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import RequestForm from "../components/RequestForm";
import Services from "../components/Services";
import FunFacts from "../components/FunFacts";
import MoreInfo from "../components/MoreInfo";
import Clients from "../components/Clients";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import Loading from '../components/Loading'

const Home = () => {
    const [stopLoading, setStopLoading] = useState(false)

    const bannerRef = useRef(null)
    const servicesRef = useRef(null)
    const moreInfoRef = useRef(null)
    const contactUsRef = useRef(null)

    useEffect(() => {
        setTimeout(() => setStopLoading(true), 300)
    })

    return !stopLoading ? <Loading /> : (
        <div className="Home">
            {/* Header */}
            {/* <SubHeader /> */}
            <Navbar
                bannerRef={bannerRef}
                servicesRef={servicesRef}
                moreInfoRef={moreInfoRef}
                contactUsRef={contactUsRef}
            />
            {/* Page Content */}
            {/* Banner Starts Here */}
            <Banner bannerRef={bannerRef} />
            {/* Request Form */}
            {/* <RequestForm h4Content={'Solicitar uma chamada de volta ?'} spanContent={'Estamos sempre disponíveis para os nossos clientes.'} aContent={'Contate Nos'} /> */}
            {/* Services */}
            <Services servicesRef={servicesRef} />
            {/* Fun Facts */}
            <FunFacts />
            {/* Request Form  Budget */}
            <RequestForm
                h4Content={'Deseja solicitar uma chamada de volta? ?'}
                spanContent={'Estamos prontos para ajudá-lo.'}
                aContent={'Solicitar'}
            />
            {/* About us */}
            <MoreInfo moreInfoRef={moreInfoRef} />
            {/* Clients */}
            <Clients />
            {/* Contact Us */}
            <ContactUs contactUsRef={contactUsRef} />
            {/* Footer Starts Here */}
            <Footer />
            {/* sub footer */}
            <SubFooter />
        </div>
    )
}

export default Home