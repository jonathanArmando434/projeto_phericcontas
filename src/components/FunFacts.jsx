import { useState } from 'react'

import './FunFacts.css'

const FunFacts = () => {
    const [ timeOfwork, setTimeOfWork ] = useState(945)
    const [goodFeedOfClients, setGoodFeedOfClients ] = useState(1280)
    const [ projectsDone, setProjectsDone ] = useState(578)
    const [ members, setMembers ] = useState(26)
    
    return(
        <div className="fun-facts">
            <div className="container">
                <div className="row align-self-center">
                    <div className="col-md-3 col-sm-3 col-6">
                        <div className="count-area-content">
                            <div className="count-digit">{timeOfwork}</div>
                            <div className="count-title">Horas de trabalho</div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="count-area-content">
                            <div className="count-digit">{goodFeedOfClients}</div>
                            <div className="count-title">Ótimas avaliações</div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="count-area-content">
                            <div className="count-digit">{projectsDone}</div>
                            <div className="count-title">Projetos Concluídos</div>
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