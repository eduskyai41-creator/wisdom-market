import { useToastContext } from '../context/ToastContext.tsx';

export const useToast = () => {
  const { addToast } = useToastContext();
  return addToast;
};
