"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";

const HomePageFooter = () => {
  return (
    <footer className="bg-primary flex max-sm:flex-wrap gap-5 items-start justify-between max-sm:py-10 py-5 md:px-28 px-5 text-white tracking-widest text-sm">
      <div className="bg-white max-sm:mx-auto p-2 text-center w-fit">
        <Image
          src={process.env.NEXT_PUBLIC_SITE_LOGO!}
          alt="Site logo"
          width={150}
          height={100}
        />
      </div>
      <div className="w-full max-sm:text-center">
        <h4 className="font-bold text-lg">Services</h4>
        <Link href="#" className="block">
          Personal Banking
        </Link>
        <Link href="#" className="block">
          Business Banking
        </Link>
        <Link href="#" className="block">
          Loan
        </Link>
        <Link href="#" className="block">
          Kiddies Banking
        </Link>
      </div>
      <div className="w-full max-sm:text-center">
        <h4 className="font-bold text-lg">Quick Links</h4>
        <Link href="#" className="block">
          About Us
        </Link>
        <Link href="#" className="block">
          Contact Us
        </Link>
        <Link href="#" className="block">
          FAQ
        </Link>
        <Link href="#" className="block">
          Privacy Policy
        </Link>
        <Link href="#" className="block">
          Terms and Conditions
        </Link>
      </div>
      <div className="w-full max-sm:text-center space-y-5">
        <div>
          <h4 className="font-bold text-lg">Connect With Us</h4>
          <div className="flex items-center max-sm:justify-center gap-2">
            <Link href="https://www.facebook.com" target="_blank">
              <Image
                src="/facebook.png"
                alt="facebook logo"
                width={25}
                height={25}
              />
            </Link>
            <Link href="https://www.x.com" target="_blank">
              <Image src="/x.png" alt="facebook logo" width={24} height={24} />
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              <Image
                src="/instagram.png"
                alt="instagram logo"
                width={25}
                height={25}
              />
            </Link>
          </div>
        </div>
        <div>
          <p>
            <span className="font-bold">Tel:</span> +000xxxxx
          </p>
          <p>
            <span className="font-bold">Email:</span> starlight@gmail.com
          </p>
          <p>Visit a branch</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold">Subscribe Newsletter</h4>
          <form className="flex items-center gap-1 w-full">
            <Input
              id="subscribe"
              name="subscribe"
              className="text-black"
              type="text"
              placeholder="Enter your email"
            />
            <Button
              variant="outline"
              className="bg-primary max-sm:p-3 text-white rounded-lg"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default HomePageFooter;
