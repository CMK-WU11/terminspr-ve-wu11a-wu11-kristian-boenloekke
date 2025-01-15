
import Image from 'next/image';
import SignupButton from '@/components/SignupButton';
import CardTrainer from '@/components/CardTrainer';
import RatingModal from '@/components/RatingModal';
import Ratings from '@/components/Ratings';
import Link from 'next/link';
import { Triangle } from 'lucide-react';
import BurgerMenu from '@/components/BurgerMenu';
import { getCurrentUser } from '@/lib/auth';

export default async function ClassDetails({ params }) {
    const { id } = await params
    const details = await fetch(`http://localhost:4000/api/v1/classes/${id}`).then((r) => r.json())
    const ratings = await fetch(`http://localhost:4000/api/v1/classes/${id}/ratings`).then(r => r.json())
    const user = await getCurrentUser()
    const userIsSignedUp = user?.classes?.some((cls) => cls.id == id)
    
    return (
        <main>
            <section className="relative w-full h-[50vh] flex flex-col">
                <Image
                    src={details.asset.url}
                    width={5000}
                    height={3333}
                    alt="training class background image"
                    className="w-full h-full object-cover filter brightness-[0.6]"
                    priority
                />
                <div className='absolute inset-0 flex flex-col justify-between'>
                    <div className='w-full flex justify-between p-4'>
                        <Link href='/home' className="text-customOrange flex gap-2 items-center">
                            <Triangle size={20} fill="#F4A88E" className=" rotate-[270deg]" />
                            Back
                        </Link>
                        <BurgerMenu />


                    </div>
                    <div className='pl-4 grid grid-cols-2 grid-rows-[1fr_1fr_40px] pb-6'>

                        <h1 className="text-[42px] leading-[3rem] text-white font-bold mb-2 
                                    col-span-2 col-start-1 row-start-1 row-span-2 self-center">
                            {details.className}
                        </h1>
                        <div className='flex flex-col items-start gap-2 
                            row-start-3 col-start-1'>
                            <Ratings classId={id} />
                            <RatingModal classId={id} className={details.className} ratings={ratings} />
                        </div>

                        <div className=' row-start-2 col-start-2 justify-self-end mt-2'>
                            <SignupButton classId={id} classDay={details.classDay} user={user} userIsSignedUp={userIsSignedUp} />
                        </div>
                    </div>
                </div>
            </section>

            <section className='p-4'>
                <h2 className='text-lg/6'>Schedule</h2>
                <p className='flex justify-between text-xs'>{details.classDay} <span>{details.classTime}</span></p>
                <p className='text-base pt-4'>{details.classDescription}</p>
            </section>

            <section className='px-4 pb-4'>
                <h2 className='text-lg'>Trainer</h2>
                <CardTrainer id={details.trainerId} />
            </section>

        </main>
    )
}
