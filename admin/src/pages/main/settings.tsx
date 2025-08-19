import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts';
import { useSettings } from '@/hooks';
import { ButtonWithLoader } from '@/components/ui';
import { toast } from 'sonner';

export default function Settings() {
    const { settings, loading, error, updating, updateSettings } = useSettings();
    const [formData, setFormData] = useState({
        creditsPerPaidComic: 3,
        creditsPerHundredNaira: 10,
        creatorEarningsPercentage: 70,
        adminCommissionPercentage: 30,
        minimumWithdrawalAmount: 1000,
        maximumWithdrawalAmount: 100000,
        platformFeePercentage: 5,
        autoApproveWithdrawalLimit: 5000
    });

    // Update form data when settings are loaded
    useEffect(() => {
        if (settings) {
            setFormData({
                creditsPerPaidComic: settings.creditsPerPaidComic,
                creditsPerHundredNaira: settings.creditsPerHundredNaira,
                creatorEarningsPercentage: settings.creatorEarningsPercentage,
                adminCommissionPercentage: settings.adminCommissionPercentage,
                minimumWithdrawalAmount: settings.minimumWithdrawalAmount,
                maximumWithdrawalAmount: settings.maximumWithdrawalAmount,
                platformFeePercentage: settings.platformFeePercentage,
                autoApproveWithdrawalLimit: settings.autoApproveWithdrawalLimit
            });
        }
    }, [settings]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value) || 0;
        
        setFormData(prev => ({
            ...prev,
            [name]: numValue
        }));

        // Auto-calculate admin commission when creator earnings change
        if (name === 'creatorEarningsPercentage') {
            setFormData(prev => ({
                ...prev,
                creatorEarningsPercentage: numValue,
                adminCommissionPercentage: 100 - numValue
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate that creator and admin percentages add up to 100
        if (formData.creatorEarningsPercentage + formData.adminCommissionPercentage !== 100) {
            toast.error('Creator earnings and admin commission percentages must add up to 100%');
            return;
        }

        const result = await updateSettings(formData);
        if (result.success) {
            toast.success('Settings updated successfully');
        } else {
            toast.error(result.error || 'Failed to update settings');
        }
    };

    const handleReset = () => {
        if (settings) {
            setFormData({
                creditsPerPaidComic: settings.creditsPerPaidComic,
                creditsPerHundredNaira: settings.creditsPerHundredNaira,
                creatorEarningsPercentage: settings.creatorEarningsPercentage,
                adminCommissionPercentage: settings.adminCommissionPercentage,
                minimumWithdrawalAmount: settings.minimumWithdrawalAmount,
                maximumWithdrawalAmount: settings.maximumWithdrawalAmount,
                platformFeePercentage: settings.platformFeePercentage,
                autoApproveWithdrawalLimit: settings.autoApproveWithdrawalLimit
            });
        }
    };

    if (loading) {
        return (
            <MainLayout title="Settings" description="Manage the default settings for the app">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout title="Settings" description="Manage the default settings for the app">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout title="Platform Settings" description="Configure default settings for credits, earnings, and withdrawals">
            <div className="">
               

                {/* Settings Summary */}
                {settings && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                            Current Settings Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                                <p className="text-blue-700 dark:text-blue-300 font-medium">Credit Exchange Rate</p>
                                <p className="text-blue-900 dark:text-blue-100">
                                    {formData.creditsPerHundredNaira} credits = ₦100
                                </p>
                            </div>
                            <div>
                                <p className="text-blue-700 dark:text-blue-300 font-medium">Paid Comic Cost</p>
                                <p className="text-blue-900 dark:text-blue-100">
                                    {formData.creditsPerPaidComic} credits per comic
                                </p>
                            </div>
                            <div>
                                <p className="text-blue-700 dark:text-blue-300 font-medium">Creator Earnings</p>
                                <p className="text-blue-900 dark:text-blue-100">
                                    {formData.creatorEarningsPercentage}% of credit value
                                </p>
                            </div>
                            <div>
                                <p className="text-blue-700 dark:text-blue-300 font-medium">Platform Commission</p>
                                <p className="text-blue-900 dark:text-blue-100">
                                    {formData.adminCommissionPercentage}% of credit value
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                                <strong>Example:</strong> A {formData.creditsPerPaidComic}-credit comic costs ₦
                                {((formData.creditsPerPaidComic / formData.creditsPerHundredNaira) * 100).toFixed(2)}. 
                                Creator earns ₦{(((formData.creditsPerPaidComic / formData.creditsPerHundredNaira) * 100) * (formData.creatorEarningsPercentage / 100)).toFixed(2)} 
                                and platform keeps ₦{(((formData.creditsPerPaidComic / formData.creditsPerHundredNaira) * 100) * (formData.adminCommissionPercentage / 100)).toFixed(2)}
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Credit Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Credit Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Credits per Paid Comic
                                </label>
                                <input
                                    type="number"
                                    name="creditsPerPaidComic"
                                    value={formData.creditsPerPaidComic}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="100"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="3"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Number of credits required to unlock a paid comic
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Credits per 100 Naira
                                </label>
                                <input
                                    type="number"
                                    name="creditsPerHundredNaira"
                                    value={formData.creditsPerHundredNaira}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="1000"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="10"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Exchange rate: how many credits equal 100 naira
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Earnings Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Earnings Distribution
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Creator Earnings Percentage
                                </label>
                                <input
                                    type="number"
                                    name="creatorEarningsPercentage"
                                    value={formData.creatorEarningsPercentage}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="100"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="70"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Percentage of credit value that goes to creators
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Admin Commission Percentage
                                </label>
                                <input
                                    type="number"
                                    name="adminCommissionPercentage"
                                    value={formData.adminCommissionPercentage}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="100"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="30"
                                    readOnly
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Auto-calculated: platform commission
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Withdrawal Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Withdrawal Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Minimum Withdrawal (₦)
                                </label>
                                <input
                                    type="number"
                                    name="minimumWithdrawalAmount"
                                    value={formData.minimumWithdrawalAmount}
                                    onChange={handleInputChange}
                                    min="100"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="1000"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Minimum amount for withdrawal requests
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Maximum Withdrawal (₦)
                                </label>
                                <input
                                    type="number"
                                    name="maximumWithdrawalAmount"
                                    value={formData.maximumWithdrawalAmount}
                                    onChange={handleInputChange}
                                    min="1000"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="100000"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Maximum amount for withdrawal requests
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Auto-Approve Limit (₦)
                                </label>
                                <input
                                    type="number"
                                    name="autoApproveWithdrawalLimit"
                                    value={formData.autoApproveWithdrawalLimit}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="5000"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Withdrawals below this amount auto-approve
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Platform Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Platform Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Platform Fee Percentage
                                </label>
                                <input
                                    type="number"
                                    name="platformFeePercentage"
                                    value={formData.platformFeePercentage}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="50"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                                    placeholder="5"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Fee percentage for marketplace transactions
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Reset
                        </button>
                        <ButtonWithLoader
                            type="submit"
                            loading={updating}
                            initialText="Save Settings"
                            loadingText="Saving..."
                            className="px-6 py-2 btn-primary rounded-lg hover:bg-primary/90 transition-colors"
                        />
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
