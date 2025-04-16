
const LinkPage = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className=" w-[400px] flex flex-col bg-[#08172c] p-7 rounded-md inset-0 shadow-[0px_0px_1px_0px_] gap-4">
        <h1 className="text-4xl font-semibold">Links</h1>
        <div className="flex flex-col text-xl">
          <h3 className="text-2xl font-bold">Public</h3>
          <hr className="mb-3 mt-2"/>
          <a href="/login" className="underline">Login</a>
          <a href="/sign-up" className="underline">Sign-up</a>
        </div>

        <div className="flex flex-col text-xl">
          <h3 className="text-2xl font-bold">Private</h3>
          <hr className="mb-3 mt-2"/>
          <a href="/" className="underline">Home</a>
          <a href="/Admin" className="underline">Admin</a>
          <a href="/editor" className="underline">Editor</a>
        </div>
      </div>
    </section>
  )
}

export default LinkPage
