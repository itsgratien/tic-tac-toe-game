import { RootState, AppDispatch } from '@/redux/index';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
