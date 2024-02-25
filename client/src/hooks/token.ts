import { useAppSelector } from '@/app/hooks';
import StorageKeys from '@/constants/storage-keys';

export function useToken(): String | null {
    const { currentUser } = useAppSelector((state) => state.auth);
    // console.log(localStorage.getItem(StorageKeys.TOKEN));
    return currentUser?.token || JSON.parse(localStorage.getItem(StorageKeys.TOKEN) || 'null')
}
