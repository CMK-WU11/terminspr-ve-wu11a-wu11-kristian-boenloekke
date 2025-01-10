import Link from "next/link";

export default function LandingPage() {

  return (
    <>
      <section className="bg-[url('/images/welcome-background.jpg')] w-full h-[70vh] bg-cover bg-center">
        <h1 className="text-xxl text-white">Believe Yourself</h1>
        <p className="text-base text-white">Train like a pro</p>
      </section>
      <section className="relative bg-[url('/images/welcome-center.jpg')] w-full h-[70vh] bg-cover bg-center">
        <Link href='/home' className="bg-white rounded-l-lg text-[26px] p-4 absolute right-0 bottom-20">
          Start training
        </Link>
      </section>
    </>
  )
}