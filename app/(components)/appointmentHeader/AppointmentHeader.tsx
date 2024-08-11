import { auth } from '@/auth';
import Link from 'next/link';

export const AppointmentHeader = async () => {
    const session = await auth();
    return (
        <>
            {session?.user && (
                <header className='w-full py-4 bg-gray-100 flex gap-2 justify-center'>
                    <Link href={'/dashboard'} className='bg-primary hover:bg-primary/90 text-white py-2 px-5 rounded'>Go to Dashboard</Link>
                    <Link href={'/create-event'} className='bg-success hover:bg-success/90 text-white py-2 px-5 rounded'>Create New Event</Link>
                </header>

            )}
        </>
    )
}
