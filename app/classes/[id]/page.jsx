
import Image from 'next/image';
import SignupButton from '@/components/SignupButton';
import CardTrainer from '@/components/CardTrainer';
import RatingModal from '@/components/RatingModal';
import Ratings from '@/components/Ratings';

export default async function ClassDetails({ params }) {
    const { id } = await params
    const details = await fetch(`http://localhost:4000/api/v1/classes/${id}`).then((r) => r.json())
    const ratings = await fetch(`http://localhost:4000/api/v1/classes/${id}/ratings`).then(r => r.json())

    return (
        <main>
            <section className="relative h-[40vh] flex flex-col">
                <Image
                    src={details.asset.url}
                    width={5000}
                    height={3333}
                    alt="training class background image"
                    className="fixed inset-0 z-[-10] w-full h-[50vh] object-cover filter brightness-[0.6]"
                    priority
                />
                <h1 className="text-xl  text-white">{details.className}</h1>
                <SignupButton classId={id} />
                <div className='flex flex-col items-start gap-2'>
                    <Ratings classId={id} />
                    <RatingModal classId={id} ratings={ratings} />
                </div>
            </section>

            <section className='p-4'>
                <h2 className='text-lg/6'>Schedule</h2>
                <p className='flex justify-between text-xs'>{details.classDay} <span>{details.classTime}</span></p>
                <p className='text-base pt-4'>{details.classDescription}</p>
            </section>

            <section className='px-4'>
                <h2 className='text-lg'>Trainer</h2>
                <CardTrainer id={details.trainerId} />
            </section>

        </main>
    )
}
