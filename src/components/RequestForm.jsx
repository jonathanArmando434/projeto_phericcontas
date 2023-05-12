import './RequestForm.css'

const RequestForm = ({h4Content, spanContent, aContent, hrefContent = '#contactus-form'}) => {
    return(
        <div className={aContent === 'Solicitar' ? "request-form budget" : "request-form"} >
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h4>{h4Content}</h4>
                        <span>{spanContent}</span>
                    </div>
                    <div className="col-md-4">
                        <a href={hrefContent} className="border-button">
                            {aContent}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestForm