'use client';

import { logo } from '@/public/assets';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaCalendarAlt, FaCalendarPlus, FaClock, FaEnvelope, FaFileDownload, FaSpinner, FaUser } from 'react-icons/fa';
import { SiGooglemeet } from 'react-icons/si';
import { useAppointment } from './useAppointment';
import { AppointmentDetailItem } from '../AppointmentDetailItem/AppointmentDetailItem';


const AppointmentBody: React.FC = () => {
    let { id } = useParams() as { id: string };

    const { appointment, loading, loadingIcsDownload, handleDownloadICS, handleGoogleMeetClick, generateGoogleCalendarLink } = useAppointment(id);

    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
                <div className="flex flex-col items-center">
                    <FaSpinner className="animate-spin h-10 w-10 text-primary" />
                </div>
            </div>
        );
    }

    const appointmentDetails = [
        {
            icon: <FaCalendarPlus className="text-light" />,
            title: 'Event ID',
            content: appointment?.eventId || '',
            iconBgColor: 'bg-primary',
        },
        {
            icon: <FaUser className="text-success" />,
            title: 'Host Details',
            content: `${appointment?.hostName || ''}\n${appointment?.hostEmail || ''}`,
            iconBgColor: 'bg-green-100 dark:bg-green-900',
        },
        {
            icon: <FaUser className="text-lemon" />,
            title: 'Invitee Details',
            content: `${appointment?.inviteeName || ''}\n${appointment?.inviteeEmail || ''}`,
            iconBgColor: 'bg-yellow-100 dark:bg-yellow-900',
        },
        {
            icon: <FaCalendarAlt className="text-danger" />,
            title: 'Meeting Date',
            content: appointment?.meetingDate || '',
            iconBgColor: 'bg-red-100 dark:bg-red-900',
        },
        {
            icon: <FaClock className="text-purple" />,
            title: 'Meeting Time',
            content: `${appointment?.meetingStartTime || ''} - ${appointment?.meetingEndTime || ''}`,
            iconBgColor: 'bg-purple/20 dark:bg-purple-900',
        },
        {
            icon: <FaEnvelope className="text-gray-500" />,
            title: 'Meeting Message',
            content: appointment?.meetingMessage || '',
            iconBgColor: 'bg-gray-100 dark:bg-gray-900',
        },
    ];


    return (
        <div>
            <Image className='mx-auto mt-10' src={logo} alt="logo" width={200} height={200} />
            <h2 className='text-2xl font-bold text-center my-8 text-dark'>Appointment Details</h2>
            <div className="flex justify-center my-8 w-[98%] mx-auto">
                {appointment ? (
                    <div className="relative mx-auto border-l border-gray-200 dark:border-gray-700">
                        {appointmentDetails?.map((detail, index) => (
                            <AppointmentDetailItem
                                key={index}
                                icon={detail?.icon}
                                title={detail?.title}
                                content={detail?.content}
                                iconBgColor={detail?.iconBgColor}
                            />
                        ))}

                        <div className="flex flex-col md:flex-row justify-center mt-10 gap-2">
                            <button onClick={generateGoogleCalendarLink} className="bg-primary/85 text-white py-2 px-4 rounded-lg flex items-center shadow hover:bg-primary transition duration-200">
                                <FaCalendarPlus className="mr-2" /> Add to Calendar
                            </button>
                            <button
                                className={`bg-success/90 text-white py-2 px-4 rounded-lg flex items-center shadow hover:bg-success transition duration-200 ${loadingIcsDownload ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleDownloadICS} disabled={loadingIcsDownload}
                            >
                                {loadingIcsDownload ? <FaSpinner className="animate-spin mr-2" /> : <FaFileDownload className="mr-2" />}
                                Download ICS
                            </button>
                            <Link href={appointment?.googleMeetUrl ? appointment?.googleMeetUrl : '#'} onClick={() => handleGoogleMeetClick(appointment?.googleMeetUrl as string)}
                                target={appointment?.googleMeetUrl ? '_blank' : ''} className="bg-danger/90 text-white py-2 px-4 rounded-lg flex items-center shadow hover:bg-danger transition duration-200">
                                <SiGooglemeet className="mr-2" /> Join Meeting
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="text-center w-full">
                        <p className='text-gray-600 font-semibold py-6 text-lg'>No appointment found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentBody;
