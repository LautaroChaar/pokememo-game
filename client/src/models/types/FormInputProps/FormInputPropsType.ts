type FormInputProps = {
	validationRegex: any; 
  label: string; 
  type: string; 
  placeholder: string;
  condition?: string;
  onChange: (value: string) => void; 
};

export default FormInputProps