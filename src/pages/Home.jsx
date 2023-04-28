import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/css/fontawesome.css'
import './Home.css'
import '../assets/css/owl.css'
import SubHeader from "../components/SubHeader";
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

const Home = () => {

    

    return (
        <div className="Home">
            {/* Header */}
            {/* <SubHeader /> */}
            <Navbar />
            {/* Page Content */}
            {/* Banner Starts Here */}
            <Banner />
            {/* Request Form */}
            {/* <RequestForm h4Content={'Solicitar uma chamada de volta ?'} spanContent={'Estamos sempre disponíveis para os nossos clientes.'} aContent={'Contate Nos'} /> */}
            {/* Services */}
            <Services />
            {/* Fun Facts */}
            <FunFacts />
            {/* Request Form  Budget */}
            <RequestForm h4Content={'Deseja solicitar nossos serviços ?'} spanContent={'Estamos prontos para ajudá-lo.'} aContent={'Solicitar'} />
            {/* About us */}
            <MoreInfo />
            {/* Clients */}
            <Clients />
            {/* Contact Us */}
            <ContactUs />
            {/* Footer Starts Here */}
            <Footer />
            {/* sub footer */}
            <SubFooter />
        </div>
    )
}

export default Home