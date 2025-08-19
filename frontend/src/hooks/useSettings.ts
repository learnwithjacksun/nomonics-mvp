import api from '@/config/api';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

export interface AdminSettings {
  id: string;
  creditsPerPaidComic: number;
  creditsPerHundredNaira: number;
  creatorEarningsPercentage: number;
  adminCommissionPercentage: number;
  minimumWithdrawalAmount: number;
  maximumWithdrawalAmount: number;
  platformFeePercentage: number;
  autoApproveWithdrawalLimit: number;
  createdAt: string;
  updatedAt: string;
}

export default function useSettings() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/settings');
      setSettings(response.data.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to fetch settings');
      } else {
        setError('Failed to fetch settings');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updatedSettings: Partial<AdminSettings>) => {
    try {
      setUpdating(true);
      setError(null);
      const response = await api.put('/admin/settings', updatedSettings);
      setSettings(response.data.data);
      return { success: true, data: response.data.data };
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Failed to update settings');
      } else {
        setError('Failed to update settings');
      }
      return { success: false, error: error };
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updating,
    fetchSettings,
    updateSettings,
  };
};
