const CTA = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Get instant access</h2>
        <p className="text-white/70 mb-8">
          Celebrate the joy of accomplishment with an app designed to track your progress and motivate your efforts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="name@email.com"
            className="w-full sm:w-72 px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-primary/50 text-white"
          />
          <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-md font-medium transition-colors">
            Get access
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA

