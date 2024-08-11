'use client'

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useChangePassForm } from "./useChangePassForm";

const ChangePassForm: React.FC = () => {
    const {
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        showCurrentPassword,
        setShowCurrentPassword,
        showNewPassword,
        setShowNewPassword,
        loading,
        handlePasswordChange,
    } = useChangePassForm();


    return (
        <>
            <form className="space-y-6" onSubmit={handlePasswordChange}>
                <div>
                    <label
                        htmlFor="current-password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Current Password
                    </label>
                    <div className="mt-1 relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            id="current-password"
                            required
                            minLength={6}
                            maxLength={9}
                            name="current-password"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                            }
                        >
                            {showCurrentPassword ? (
                                <IoEyeOutline />
                            ) : (
                                <IoEyeOffOutline />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        New Password
                    </label>
                    <div className="mt-1 relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="new-password"
                            name="new-password"
                            required
                            minLength={6}
                            maxLength={9}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </button>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {loading ? 'loading...' : 'Change Password'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default ChangePassForm