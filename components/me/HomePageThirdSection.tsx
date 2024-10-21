import { CheckCheck } from 'lucide-react'

const HomePageThirdSection = () => {
  return (
    <section className="bg-primary/5 py-10 md:py-20 px-5 md:px-28 text-center space-y-10">
        <h2 className="font-bold text-5xl">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-2">
            <span className="text-center inline-block border p-1 rounded-full border-red-600 text-red-600">
              <CheckCheck size={18} />
            </span>
            <h3 className="text-xl font-bold text-red-600">
              Secure and Seamless Transactions
            </h3>
            <p>
              <span className="text-primary font-bold">
                Peace of Mind Guaranteed
              </span>
              . Transact with confidence, backed by our advanced security
              protocols designed to protect your financial peace of mind.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-center inline-block border p-1 rounded-full border-red-600 text-red-600">
              <CheckCheck size={18} />
            </span>
            <h3 className="text-xl font-bold text-red-600">Mobile Banking</h3>
            <p>
              <span className="text-primary font-bold">Effortless Access.</span>{" "}
              Our App ensures you’re always connected to your finances, with
              seamless compatibility across devices for on-the-go banking.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-center inline-block border p-1 rounded-full border-red-600 text-red-600">
              <CheckCheck size={18} />
            </span>
            <h3 className="text-xl font-bold text-red-600">
              Customizable Dashboard
            </h3>
            <p>
              <span className="text-primary font-bold">Tailored Overview</span>.
              Set your dashboard to prioritize and present essential financial
              details, streamlining your banking experience.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-center inline-block border p-1 rounded-full border-red-600 text-red-600">
              <CheckCheck size={18} />
            </span>
            <h3 className="text-xl font-bold text-red-600">24/7 Support</h3>
            <p>
              <span className="text-primary font-bold">
                Always at Your Service.
              </span>{" "}
              Our dedicated team is available any time, ensuring you receive the
              help you need, whenever you need it.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-center inline-block border p-1 rounded-full border-red-600 text-red-600">
              <CheckCheck size={18} />
            </span>
            <h3 className="text-xl font-bold text-red-600">
              Competitive Rates
            </h3>
            <p>
              <span className="text-primary font-bold"> Grow Your Wealth.</span>{" "}
              Benefit from our bank’s superior interest rates on savings and
              loans, crafted to enhance your financial journey.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-center inline-block border p-1 rounded-full border-red-600 text-red-600">
              <CheckCheck size={18} />
            </span>
            <h3 className="text-xl font-bold text-red-600">
              Comprehensive Services
            </h3>
            <p>
              <span className="text-primary font-bold">
                Full-Spectrum Banking.
              </span>{" "}
              From daily banking to diverse investment choices, our services
              cater to all your financial needs with professionalism and ease.
            </p>
          </div>
        </div>
      </section>
  )
}

export default HomePageThirdSection