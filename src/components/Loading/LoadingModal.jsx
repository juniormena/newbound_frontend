import React from 'react'

export const LoadingModal = () => {

    return (
        <>
            <div className="loading">
                <div className="ventanaModal">
                <h5 className="mb-4">Realizando peticion</h5>
                <div className="spinner-border text-purple" role="status">
                         <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </>
    )
}
