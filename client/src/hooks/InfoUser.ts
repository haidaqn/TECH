import { useAppSelector } from '@/app/hooks';
import StorageKeys from '@/constants/storage-keys';
import { User } from '@/models';

export function useInforUser(): User | null {
    const user = useAppSelector((state) => state.auth.currentUser?.data);
    return JSON.parse(localStorage.getItem(StorageKeys.USER) || 'null') || user || null;
}
