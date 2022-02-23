import { useToast as useToastUI } from "@chakra-ui/toast";

const useToast = () => {
  const toast = useToast();
  const displayToast = ({
    description,
    status = "error",
    position = "top",
    duration = 20000,
  }) => {
    toast.closeAll();

    toast({
      duration,
      description,
      status,
      position,
    });
  };
  return { display: displayToast };
};

export default useToast;
