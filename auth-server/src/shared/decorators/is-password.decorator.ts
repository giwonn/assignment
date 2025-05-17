import {
  IsStrongPassword,
  IsStrongPasswordOptions,
  ValidationOptions,
} from 'class-validator';

export function IsPassword({
  options = {},
  validationOptions = {},
}: {
  options?: IsStrongPasswordOptions;
  validationOptions?: ValidationOptions;
} = {}): PropertyDecorator {
  const defaultOptions: IsStrongPasswordOptions = {
    minLength: 10, // 최소 비밀번호 길이
    minLowercase: 1, // 최소 소문자 개수
    minNumbers: 1, // 최소 숫자 개수
    minUppercase: 0, // 대문자는 사용하지 않아도 됨
    minSymbols: 0, // 특수문자는 사용하지 않아도 됨
  };

  const defaultValidationOptions: ValidationOptions = {
    message:
      '비밀번호는 최소 10자 이상이며 소문자 1개 이상, 숫자 1개 이상이 포함되어야 합니다.',
  };

  return IsStrongPassword(
    {
      ...defaultOptions,
      ...options,
    },
    {
      ...defaultValidationOptions,
      ...validationOptions,
    },
  );
}
