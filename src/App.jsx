import { BrowserRouter } from "react-router"
import AppRoutes from "./routes"
// import { motion } from "framer-motion";


function App() {

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      {/* <div className="container mx-auto"> */}
      {/* <div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center h-screen">
          <motion.div
            transition={{
              duration: 5,
              delay: 0.5,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <h1>Lorem, ipsum dolor.</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo voluptates adipisci eius minima quos, commodi laudantium? Veritatis est delectus dolorum ab odit reprehenderit facere dignissimos beatae hic. Corporis, ipsa officiis.</p>
            <button>Lorem Button</button>
          </motion.div>
          <div className="">
            <img src="/assets/brain.webp" alt="" />
          </div>
        </div>
      </div> */}

    </>
  )
}

export default App
