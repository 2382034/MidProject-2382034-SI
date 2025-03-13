import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className='pt-15'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout