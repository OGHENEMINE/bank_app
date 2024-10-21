import Image from "next/image"
import Link from "next/link"

const HomePageFourthSection = () => {
  return (
    <section className="my-10 md:my-20 px-5 md:px-28 text-center tracking-wider space-y-10">
    <div>
      <h2 className="font-bold text-5xl mb-2 text-primary">
        Service We Offer
      </h2>
      <p>Explore these services to elevate your banking experience</p>
    </div>

    {/* EXPLORE CONTENT */}
    <div className="flex items-center justify-between flex-wrap gap-10">
      {/* 1ST CONTENT */}
      <div className="shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
        <div className="relative w-full h-64">
          <Image
            src="/Loan Services.png"
            layout="fill"
            objectFit="cover"
            alt="a happy person"
          />
        </div>
        <div className="p-5 space-y-1 text-sm">
          <h4 className="text-lg font-bold text-primary">
            International Banking
          </h4>
          <p>
            Streamline your global finances with our international banking
            solutions, facilitating seamless transactions and currency
            exchange across borders.
          </p>
          <Link
            href="#"
            className="border inline-block text-red-600 font-bold py-1 px-2 rounded-md"
          >
            Learn more
          </Link>
        </div>
      </div>
      <div className="shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
        <div className="relative w-full h-64">
          <Image
            src="/Loan Services.png"
            layout="fill"
            objectFit="cover"
            alt="a happy person"
          />
        </div>
        <div className="p-5 space-y-1 text-sm">
          <h4 className="text-lg font-bold text-primary">
            Kiddies Banking
          </h4>
          <p>
            Introduce your children to the world of finance with our
            specially designed kiddies banking accounts, fostering financial
            literacy from a young age.
          </p>
          <Link
            href="#"
            className="border inline-block text-red-600 font-bold py-1 px-2 rounded-md"
          >
            Learn more
          </Link>
        </div>
      </div>
      {/* 3RD CONTENT */}
      <div className="shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
        <div className="relative w-full h-64">
          <Image
            src="/Student Banking.png"
            layout="fill"
            objectFit="cover"
            alt="a happy person"
          />
        </div>
        <div className="p-5 space-y-1 text-sm">
          <h4 className="text-lg font-bold text-primary">
            Student Banking
          </h4>
          <p>
            Support your educational journey with our student banking
            services, offering special accounts and resources designed for
            students.
          </p>
          <Link
            href="#"
            className="border inline-block text-red-600 font-bold py-1 px-2 rounded-md"
          >
            Learn more
          </Link>
        </div>
      </div>
      <div className="shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
        <div className="relative w-full h-64">
          <Image
            src="/Loan Services.png"
            layout="fill"
            objectFit="cover"
            alt="a happy person"
          />
        </div>
        <div className="p-5 space-y-1 text-sm">
          <h4 className="text-lg font-bold text-primary">Loan Services</h4>
          <p>
            Achieve your dreams with our flexible loan options tailored to
            your needs, whether it&apos;s for a home, car, or personal expenses.
          </p>
          <Link
            href="#"
            className="border inline-block text-red-600 font-bold py-1 px-2 rounded-md"
          >
            Learn more
          </Link>
        </div>
      </div>
      <div className="shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
        <div className="relative w-full h-64">
          <Image
            src="/Investment Banking.png"
            layout="fill"
            objectFit="cover"
            alt="a happy person"
          />
        </div>
        <div className="p-5 space-y-1 text-sm">
          <h4 className="text-lg font-bold text-primary">
            Investment Services
          </h4>
          <p>
            Grow your wealth and secure your future with our expert
            investment guidance and diverse portfolio options tailored to
            your financial goals.
          </p>
          <Link
            href="#"
            className="border inline-block text-red-600 font-bold py-1 px-2 rounded-md"
          >
            Learn more
          </Link>
        </div>
      </div>
      <div className="shadow-md rounded-lg w-full md:w-[45%] lg:w-[30%]">
        <div className="relative w-full h-64">
          <Image
            src="/Loan Services.png"
            layout="fill"
            objectFit="cover"
            alt="a happy person"
          />
        </div>
        <div className="p-5 space-y-1 text-sm">
          <h4 className="text-lg font-bold text-primary">
            Business Banking
          </h4>
          <p>
            Empower your business with our comprehensive suite of banking
            solutions, including accounts, loans, and merchant services, to
            fuel success.
          </p>
          <Link
            href="#"
            className="border inline-block text-red-600 font-bold py-1 px-2 rounded-md"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  </section>
  )
}

export default HomePageFourthSection