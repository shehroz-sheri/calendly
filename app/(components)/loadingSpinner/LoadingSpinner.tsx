import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center space-x-2">
            <FaSpinner className="animate-spin h-12 w-12 text-primary" />
        </div>
    </div>
);

export default LoadingSpinner;
