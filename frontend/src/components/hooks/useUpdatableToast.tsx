import { ToastId, ToastProps, useToast } from '@chakra-ui/react';
import { useRef } from 'react';

export default function useUpdatableToast(duration = 5000, isClosable = true) {
  const toast = useToast();
  const clearToasts = toast.closeAll;
  const toastIdRef = useRef<ToastId>();

  function updateToast(props: ToastProps) {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, { duration, isClosable, ...props });
    }
  }
  function addToast(props: ToastProps) {
    toastIdRef.current = toast({
      duration,
      isClosable,
      ...props,
    });
  }

  return { addToast, updateToast, clearToasts };
}
