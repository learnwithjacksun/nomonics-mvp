import { useState, useEffect } from 'react';
import api from '@/config/api';
import { AxiosError } from 'axios';

export const useAdminCommission = () => {
  const [totalCommission, setTotalCommission] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommission = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/commission');
      setTotalCommission(response.data.data.totalCommission);
    } catch (err: unknown) {
      const error = err as AxiosError;
      setError((error.response?.data as { message?: string })?.message || 'Failed to fetch commission');
      setTotalCommission(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommission();
  }, []);

  return {
    totalCommission,
    loading,
    error,
    refetch: fetchCommission,
  };
};
