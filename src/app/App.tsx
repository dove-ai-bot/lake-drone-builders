/* 
 Contains most of the routing and NavBar
*/
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { About } from "./about/page"
import { Home } from "./home/page"
import { Store } from "./store/page"
import { Navbar } from "./components/Navbar"

import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar></Navbar>
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
