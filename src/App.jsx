
import './App.css'
import SeatMap from './Components/SeatMap'
import { GlobalStylesProvider } from './contexts/GlobalStylesContext'


function App() {

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline text-cyan-500">
        Hello world!
      </h1> */}
      <GlobalStylesProvider>
        <div className="App">
          <SeatMap />

        </div>
      </GlobalStylesProvider>

    </>
  )
}

export default App
