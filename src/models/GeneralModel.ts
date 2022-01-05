import { AuditingModel } from 'models/AuditingModel';
import { MeetingModel } from 'models/MeetingModel';

export interface GeneralModel {
  Auditings: AuditingModel[];
  CooperativeId: string;
  CooperativeName: string;
  CooperativeLink: string | null;
  CreateAuditingLink: string | null;
  CreateBoardMeetingLink: string | null;
  CreateGeneralMeetingLink: string | null;
  EndDate: string | null;
  Id: string;
  IsClosed: boolean | null;
  Meetings: MeetingModel[];
  StartDate: string | null;
}
