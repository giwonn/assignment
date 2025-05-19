export class FindClaimHistoryDto {
  constructor(params: {
    eventId?: string;
    userId?: string;
    success?: boolean;
  }) {
    this.eventId = params.eventId;
    this.userId = params.userId;
    this.success = params.success;
  }

  eventId?: string;
  userId?: string;
  success?: boolean;
}
