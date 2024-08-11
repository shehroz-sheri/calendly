'use client';

import { logo } from '@/public/assets';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaCalendarPlus, FaClock, FaEnvelope, FaFileDownload, FaSpinner, FaUser } from 'react-icons/fa';
import { SiGooglemeet } from 'react-icons/si';
import { useAppointment } from './useAppointment';


const AppointmentBody: React.FC = () => {
    let { id } = useParams() as { id: string };

    const { appointment, loading, loadingIcsDownload, handleDownloadICS, generateGoogleCalendarLink } = useAppointment(id);

    if (loading) {
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
                <div className="flex flex-col items-center">
                    <FaSpinner className="animate-spin h-10 w-10 text-primary" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <Image className='mx-auto mt-10' src={logo} alt="logo" width={200} height={200} />
            <h2 className='text-2xl font-bold text-center my-8 text-dark'>Appointment Details</h2>
            <div className="flex justify-center my-8 w-[98%] mx-auto">
                {appointment ? (
                    <div className="relative mx-auto border-l border-gray-200 dark:border-gray-700">
                        <div className="mb-10 ml-6">
                            <span className="flex absolute -left-6 justify-center items-center w-12 h-12 bg-primary rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <FaCalendarPlus className="text-light" />
                            </span>
                            <h3 className="ml-3 flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Event ID</h3>
                            <p className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{appointment.eventId}</p>
                        </div>
                        <div className="mb-10 ml-6">
                            <span className="flex absolute -left-6 justify-center items-center w-12 h-12 bg-green-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-green-900">
                                <FaUser className="text-green-500" />
                            </span>
                            <h3 className="ml-3 flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Host Details</h3>
                            <p className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{appointment.hostName}</p>
                            <p className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{appointment.hostEmail}</p>
                        </div>
                        <div className="mb-10 ml-6">
                            <span className="flex absolute -left-6 justify-center items-center w-12 h-12 bg-yellow-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-yellow-900">
                                <FaUser className="text-yellow-500" />
                            </span>
                            <h3 className="ml-3 flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Invitee Details</h3>
                            <p className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{appointment.inviteeName}</p>
                            <p className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{appointment.inviteeEmail}</p>
                        </div>
                        <div className="mb-10 ml-6">
                            <span className="flex absolute -left-6 justify-center items-center w-12 h-12 bg-red-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-red-900">
                                <FaCalendarAlt className="text-red-500" />
                            </span>
                            <h3 className="ml-3 flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Meeting Date</h3>
                            <p className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{appointment.meetingDate}</p>
                        </div>
                        <div className="mb-10 ml-6">
                            <span className="flex absolute -left-6 justify-center items-center w-12 h-12 bg-purple/20 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-purple-900">
                                <FaClock className="text-purple-500" />
                            </span>
                            <h3 className="ml-3 flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Meeting Time</h3>
                            <p className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{appointment.meetingStartTime} - {appointment.meetingEndTime}</p>
                        </div>
                        <div className="mb-10 ml-6">
                            <span className="flex absolute -left-6 justify-center items-center w-12 h-12 bg-gray-100 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-gray-900">
                                <FaEnvelope className="text-gray-500" />
                            </span>
                            <h3 className="ml-3 flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Meeting Message</h3>
                            <p className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{appointment.meetingMessage}</p>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center mt-10 gap-2">
                            <button onClick={generateGoogleCalendarLink} className="bg-primary/85 text-white py-2 px-4 rounded-lg flex items-center shadow hover:bg-primary transition duration-200">
                                <FaCalendarPlus className="mr-2" /> Add to Calendar
                            </button>
                            <button
                                className={`bg-green-500 text-white py-2 px-4 rounded-lg flex items-center shadow hover:bg-green-600 transition duration-200 ${loadingIcsDownload ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleDownloadICS} disabled={loadingIcsDownload}
                            >
                                {loadingIcsDownload ? <FaSpinner className="animate-spin mr-2" /> : <FaFileDownload className="mr-2" />}
                                Download ICS
                            </button>
                            <Link href={appointment.googleMeetUrl ? appointment.googleMeetUrl : 'javascript:void(0)'} onClick={() => !appointment.googleMeetUrl ? toast.error('Google Meet URL is not available.') : ''}
                                target={appointment.googleMeetUrl ? '_blank' : ''} className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center shadow hover:bg-red-600 transition duration-200">
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
