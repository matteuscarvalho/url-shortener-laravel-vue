import axios from "axios";
import { toast } from "vue3-toastify";

export const handleError = (error: any): void => {
  
  if (error.response && error.response.data) {
    console.log(error.response.data);
    if (error.response.data.errors) {
      const errorMessages: { [key: string]: string[] } =
        error.response.data.errors;

      for (const key in errorMessages) {
        if (Object.prototype.hasOwnProperty.call(errorMessages, key)) {
          const errorMessage = errorMessages[key];
          console.log(errorMessage);
          toast.error(errorMessage[0], {
            toastId: key
          });
        }
      }
    } else if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Ocorreu um erro no registro. Por favor, tente novamente.");
    }
  } else {
    toast.error("Ocorreu um erro, tente novamente.");
  }
};
