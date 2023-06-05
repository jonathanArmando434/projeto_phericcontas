import homeZustand from '../zustand/home'

import './FunFacts.css'

const FunFacts = () => {
    const { members, clients, tasksFinished, clientsLogo } = homeZustand(state => state);

    return(
        <div className="fun-facts">
            <div className="container">
                <div className="row align-self-center">
                    <div className="col-md-3 col-sm-3 col-6">
                        <div className="count-area-content">
                            <div className="count-digit">{new Date().getFullYear() - 2009}</div>
                            <div className="count-title">Anos de experiência</div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="count-area-content">
                            <div className="count-digit">{tasksFinished}</div>
                            <div className="count-title">Projetos Concluídos</div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="count-area-content">
                            <div className="count-digit">{clients}</div>
                            <div className="count-title">Clientes</div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="count-area-content" id="count-area-content-4">
                            <div className="count-digit">{members}</div>
                            <div className="count-title">Colaboradores</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FunFacts