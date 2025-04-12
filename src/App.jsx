import { BrowserRouter } from "react-router"
import AppRoutes from "./routes"
// import { motion } from "framer-motion";


function App() {

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      {/* <motion.div
        transition={{
          duration: 10,
          delay: 0.5,
        }}
        initial={{
          width: 0,
        }}
        animate={{ width: "100%" }}
        exit={{ width: 0 }}
        className="bg-red-600 h-10">
      </motion.div>

      <div className="container mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center h-screen">
          <motion.div
            transition={{
              duration: 1.5,
              delay: 0.5,
            }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h1>Lorem, ipsum dolor.</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo voluptates
              adipisci eius minima quos, commodi laudantium?
            </p>
            <button>Lorem Button</button>
          </motion.div>

          <motion.div
            transition={{
              duration: 3,
              delay: 0.5,
            }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <img src="/assets/brain.webp" alt="" />
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center h-screen">
          <motion.div
            transition={{
              duration: 1.5,
              delay: 0.5,
            }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h1>Lorem, ipsum dolor.</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo voluptates
              adipisci eius minima quos, commodi laudantium?
            </p>
            <button>Lorem Button</button>
          </motion.div>

          <motion.div
            transition={{
              duration: 3,
              delay: 0.5,
            }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <img src="/assets/brain.webp" alt="" />
          </motion.div>
        </div>
      </div> */}


    </>
  )
}

export default App
