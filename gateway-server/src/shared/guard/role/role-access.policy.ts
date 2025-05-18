/**
 * @description 권한 체크가 필요 없는 경우엔 null로 설정됨
 */
export const roleAccessPolicy: Record<
  string,
  Record<string, string[] | null>
> = {
  '/users': {
    POST: null,
  },
  '/auth/login': {
    POST: null,
  },
};
