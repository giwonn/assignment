export enum EventID {
  로그인_3일,
  로그인_7일,
  친구_초대,
}

interface Event {
  id: EventID;
  email: string;
  details: JSON;
  isSuccess: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  startAt: Date;
  endAt: Date;
}
