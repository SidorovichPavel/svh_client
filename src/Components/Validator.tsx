const validateInput = (input: string): boolean => {
  const regex = /^[А-Яа-яёЁ\s_0-9]*$/;
  return regex.test(input);
};

export default validateInput;