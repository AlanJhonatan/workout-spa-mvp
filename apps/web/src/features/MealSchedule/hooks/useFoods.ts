import { api } from '@/lib/api';
import type { Food } from '@/types';
import { useEffect, useState } from 'react';

interface UseFoodsReturn {
  foods: Food[];
  loading: boolean;
  error: string | null;
  searchFoods: (searchTerm: string) => Food[];
  getFoodById: (id: string) => Food | undefined;
}

export function useFoods(): UseFoodsReturn {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<Food[]>('/foods');
        setFoods(response.data);
      } catch (err) {
        setError('Failed to fetch foods');
        console.error('Error fetching foods:', err);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const searchFoods = (searchTerm: string): Food[] => {
    if (!searchTerm.trim()) return foods;
    
    return foods.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFoodById = (id: string): Food | undefined => {
    return foods.find((food) => food.id === id);
  };

  return {
    foods,
    loading,
    error,
    searchFoods,
    getFoodById,
  };
}