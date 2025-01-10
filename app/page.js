import Button from "@/components/Button";
import Image from "next/image";

export default function LandingPage() {

  return (
    <>
      <section className="bg-[url('/images/welcome-background.jpg')] w-full h-[70vh] bg-cover bg-center">
        <h1 className="text-xxl text-white">Believe Yourself</h1>
        <p className="text-base text-white">Train like a pro</p>
      </section>
      <section className="relative bg-[url('/images/welcome-center.jpg')] w-full h-[70vh] bg-cover bg-center">
        <Button text="Start Training" className={"absolute right-0 bottom-20"} href="/home"/>
        Halloo
      </section>
    </>
  )
}