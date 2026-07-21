import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export type ContactType = "shelter" | "sponsor";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
  shelterName?: string;
  shelterLocation?: string;
  shelterType?: string;
}

type ContactSubmissionPayload = {
  type: ContactType;
  name: string;
  email: string;
  message: string;
  phone?: string;
  organization?: string;
  shelterName?: string;
  shelterLocation?: string;
  shelterType?: string;
};

const emptyFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  message: "",
  shelterName: "",
  shelterLocation: "",
  shelterType: "",
};

const trimToUndefined = (value?: string) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const toPayload = (
  type: ContactType,
  data: ContactFormData,
): ContactSubmissionPayload => ({
  type,
  name: data.name.trim(),
  email: data.email.trim(),
  message: data.message.trim(),
  phone: trimToUndefined(data.phone),
  organization: trimToUndefined(data.organization),
  shelterName: trimToUndefined(data.shelterName),
  shelterLocation: trimToUndefined(data.shelterLocation),
  shelterType: trimToUndefined(data.shelterType),
});

export const useContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>(emptyFormData);

  const contactMutation = useMutation({
    mutationFn: (payload: ContactSubmissionPayload) =>
      api.post("/contact", payload),
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
        setFormData(emptyFormData);
      }, duration);
    },
    onError: (error: Error) => {
      console.error("Error submitting form:", error);
    },
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (type: ContactType) => (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(toPayload(type, formData));
  };

  return {
    formData,
    isSubmitted,
    progress,
    isPending: contactMutation.isPending,
    isError: contactMutation.isError,
    handleInputChange,
    handleSubmit,
  };
};
