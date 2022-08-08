import { useState, useEffect } from 'react';

export const useFormData = (data = {}) => {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(data)
  })
  return formData;
}