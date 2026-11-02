export default function Footer( props: {currentPage: string, setCurrentPage: (page: string) => void}) {
    return (
      <header className="pageHeader bg-dark text-light p-3 rounded">
        <div className="container">
          <h1>Dog Breeds</h1>
          <nav className="buttonContainer" aria-label="Main menu">
            <button className={props.currentPage === "Home" ? "btn btn-success" : "btn btn-outline-light"} onClick={() => props.setCurrentPage("Home")}>Home</button>
            <button className={props.currentPage === "Admin" ? "btn btn-success" : "btn btn-outline-light"} onClick={() => props.setCurrentPage("Admin")}>Admin</button>
            <button className={props.currentPage === "Moderator" ? "btn btn-success" : "btn btn-outline-light"} onClick={() => props.setCurrentPage("Moderator")}>Moderator</button>
          </nav>
        </div>
      </header>
    )
}
