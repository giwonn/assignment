import { Role } from '@/shared/guard/role/role.enum';

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
  '/events': {
    GET: null,
    POST: [Role.OPERATOR],
  },
  '/events/progress': {
    POST: [Role.OPERATOR],
  },
  '/rewards': {
    GET: null,
    POST: [Role.OPERATOR],
  },
  '/rewards/claims': {
    POST: [Role.USER],
  },
  '/rewards/claim-histories/me': {
    GET: [Role.USER, Role.AUDITOR, Role.OPERATOR],
  },
  '/rewards/claim-histories': {
    GET: [Role.AUDITOR, Role.OPERATOR],
  },
};
