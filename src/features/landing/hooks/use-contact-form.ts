import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
  shelterName?: string;
  shelterLocation?: string;
  shelterType?: string;
  contacthipType?: string;
  budget?: string;
}

// Mock API function
const submitContactForm = async (
  data: ContactFormData,
): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate random success/failure for testing
  const isSuccess = Math.random() > 0.1; // 90% success rate

  if (isSuccess) {
    console.log('Form data submitted:', data);
    return {
      success: true,
      message: 'Mensaje enviado con éxito',
    };
  } else {
    throw new Error('Error al enviar el mensaje. Por favor, intentá de nuevo.');
  }
};

// Custom hook for contact form
export const useContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    shelterName: '',
    shelterLocation: '',
    shelterType: '',
    contacthipType: '',
    budget: '',
  });

  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      setIsSubmitted(true);
      setProgress(0);

      const startTime = Date.now();
      const duration = 3000; // 3 seconds

      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);

        if (newProgress < 100) {
          requestAnimationFrame(animateProgress);
        }
      };

      requestAnimationFrame(animateProgress);

      setTimeout(() => {
        setIsSubmitted(false);
        setProgress(0);
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          message: '',
          shelterName: '',
          shelterLocation: '',
          shelterType: '',
          contacthipType: '',
          budget: '',
        });
      }, duration);
    },
    onError: (error: Error) => {
      console.error('Error submitting form:', error);
    },
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return {
    formData,
    isSubmitted,
    progress,
    isPending: contactMutation.isPending,
    handleInputChange,
    handleSubmit,
  };
};
