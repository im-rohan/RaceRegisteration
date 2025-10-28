// Disabled toast functionality - returns empty functions
export const useToast = () => ({
  toast: (props: any) => ({ id: "", dismiss: () => {}, update: () => {} }),
  dismiss: (toastId?: string) => {},
  toasts: []
});

export const toast = (props: any) => ({ id: "", dismiss: () => {}, update: () => {} });