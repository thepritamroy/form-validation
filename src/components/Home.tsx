
const Home = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className=" w-[400px] flex flex-col bg-[#08172c] p-7 rounded-md inset-0 shadow-[0px_0px_1px_0px_] gap-4 text-xl">
        <h1 className="text-2xl font-bold">Home</h1>
        <a href="/admin" className="underline">Go to Admin Page</a>
        <a href="/editor" className="underline">Go to Editors Page</a>
        <a href="/lounge" className="underline">Go to Lounge Page</a>
        <a href="/linkPage" className="underline">Go to all Link page</a>
      </div>
    </section>
  )
}

export default Home
