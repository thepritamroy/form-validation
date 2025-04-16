import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <main className="bg-[hsl(0,0%,5%)] text-white min-h-screen">
      <Outlet/>
    </main>
  )
}

export default Layout
