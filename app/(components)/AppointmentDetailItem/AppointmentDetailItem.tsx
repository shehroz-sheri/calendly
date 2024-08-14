import { AppointmentDetailItemProps } from '@/types/types';

export const AppointmentDetailItem: React.FC<AppointmentDetailItemProps> = ({ icon, title, content, iconBgColor }) => {
  return (
    <div className="mb-10 ml-6">
      <span className={`flex absolute -left-6 justify-center items-center w-12 h-12 ${iconBgColor} rounded-full ring-8 ring-white dark:ring-gray-900`}>
        {icon}
      </span>
      <h3 className="ml-3 flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">{content}</p>
    </div>
  );
};
