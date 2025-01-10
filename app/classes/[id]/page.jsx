
import Image from 'next/image';
import SignupButton from '@/components/SignupButton';
import CardTrainer from '@/components/CardTrainer';

export default async function ClassDetails({ params }) {
    const { id } = await params
    const details = await fetch(`http://localhost:4000/api/v1/classes/${id}`).then((r) => r.json())
    console.log(details);
    

    return (
        <main>
            <section className="relative h-[40vh] flex flex-col">
                <Image
                    src={details.asset.url}
                    width={5000}
                    height={3333}
                    alt="training class background image"
                    className="fixed inset-0 z-[-10] w-full h-[50vh] object-cover filter brightness-50"
                    priority
                />
                <h1 className="text-xl text-white">{details.className}</h1>
                <SignupButton classId={id} />
            </section>
            <section>
                <h2 className='text-lg'>Schedule</h2>
                <p className='flex justify-between'>{details.classDay} <span>{details.classTime}</span></p>
                <p>{details.classDescription}</p>

            </section>
            <section className='pt-6'>
                <h2 className='text-lg'>Trainer</h2>
                <CardTrainer id={details.trainerId} />

            </section>
        </main>
    )
}
