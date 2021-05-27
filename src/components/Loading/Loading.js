function PageBlockLoading(){
    return(
        <div className="overlay overlayVisible" style={{display:"grid", placeItems:"center"}}>
            <div>
                <div className="loader bg-transparent no-shadow p-0">
                    <div className="ball-grid-pulse">
                        <div className="bg-white"/>
                        <div className="bg-white"/>
                        <div className="bg-white"/>
                        <div className="bg-white"/>
                        <div className="bg-white"/>
                        <div className="bg-white"/>
                        <div className="bg-white"/>
                        <div className="bg-white"/>
                        <div className="bg-white"/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PageBlockLoading;