import './FunFacts.css'

const FunFacts = () => {
    return(
        <div className="fun-facts">
            <div className="container">
                <div className="row align-self-center">
                    <div className="col-md-3 col-sm-3 col-6">
                        <div className="count-area-content">
                            <div className="count-digit">945</div>
                            <div className="count-title">Horas de trabalho</div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="count-area-content">
                            <div className="count-digit">1280</div>
                            <div className="count-title">Ótimas avaliações</div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="count-area-content">
                            <div className="count-digit">578</div>
                            <div className="count-title">Projetos Concluídos</div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="count-area-content" id="count-area-content-4">
                            <div className="count-digit">26</div>
                            <div className="count-title">Colaboradores</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FunFacts