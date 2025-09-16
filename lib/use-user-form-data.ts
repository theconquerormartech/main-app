import { useState, useEffect } from "react";
import { getUserFormData, clearUserFormData, UserFormData } from "./cookie-utils";

interface UseUserFormDataReturn {
  formData: UserFormData;
  setFormData: (updates: Partial<UserFormData>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  message: string;
  clearFormData: () => void;
}

export function useUserFormData(): UseUserFormDataReturn {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load form data from plain cookie on component mount
  useEffect(() => {
    const loadFormData = () => {
      try {
        const userData = getUserFormData();
        
        if (userData) {
          setFormData(userData);
          setMessage("Form data loaded from cookie!");
        } else {
          setMessage("No previous form data found. Please fill out the form.");
        }
      } catch (error) {
        console.error("Error loading form data:", error);
        setMessage("Error loading previous form data. Please fill out the form.");
      } finally {
        setIsLoading(false);
      }
    };

    loadFormData();
  }, []);

  const updateFormData = (updates: Partial<UserFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFormData = () => {
    clearUserFormData();
    setFormData({ firstName: "", lastName: "", email: "" });
    setMessage("Form data cleared.");
  };

  return {
    formData,
    setFormData: updateFormData,
    handleInputChange,
    isLoading,
    message,
    clearFormData,
  };
}
