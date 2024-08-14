'use client'

import { useChangePassForm } from "./useChangePassForm";
import FormInputField from "../formInputField/FormInputField";

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
                <FormInputField
                    id="current-password"
                    name="current-password"
                    type="password"
                    label="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    showPassword={showCurrentPassword}
                    togglePasswordVisibility={() => setShowCurrentPassword(!showCurrentPassword)}
                    required
                    minLength={6}
                    maxLength={9}
                    className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pr-10"
                />

                <FormInputField
                    id="new-password"
                    name="new-password"
                    type="password"
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    showPassword={showNewPassword}
                    togglePasswordVisibility={() => setShowNewPassword(!showNewPassword)}
                    required
                    minLength={6}
                    maxLength={9}
                    className="border-[1.5px] text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pr-10"
                />

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
    );
}

export default ChangePassForm;
