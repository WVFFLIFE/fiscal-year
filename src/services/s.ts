import CrmAction from './CrmAction';
import {
  GeneralTypeCode,
  TypeCode,
  ProductCode,
  UsageCode,
} from 'enums/liabilities';
import {
  LockFiscalYearResponseCode,
  UnlockFiscalYearResponseCode,
  ValidateFiscalYearResponseCode,
  CopyFiscalYearResponseCode,
} from 'enums/responses';

export namespace Services {
  export namespace Model {
    export interface BaseResponse {
      IsSuccess: boolean;
      Message: string;
    }
    export interface ResponseWithCode<T> extends BaseResponse {
      ResponseCode: T | null;
    }

    export namespace FiscalYear {
      export namespace Lock {
        export interface Response
          extends ResponseWithCode<LockFiscalYearResponseCode> {}
      }
      export namespace Unlock {
        export interface Response
          extends ResponseWithCode<UnlockFiscalYearResponseCode> {}
      }
      export namespace Copy {
        export interface Response
          extends ResponseWithCode<CopyFiscalYearResponseCode> {}
      }
      export namespace Validate {
        export interface Request {
          CooperativeId: string;
          FiscalYearId: string;
          StartDate: string;
          EndDate: string;
        }
        export interface Response
          extends ResponseWithCode<ValidateFiscalYearResponseCode> {}
      }
      export namespace Save {
        export interface Request {
          FiscalYearId: string;
          StartDate: string;
          EndDate: string;
        }
        export interface Response extends BaseResponse {}
      }
    }

    export namespace ConsumptionImage {
      export enum ConsumptionImageResponseCode {
        FileSizeExceeed = 1,
      }

      export interface UpdateReq {
        FiscalYearId: string;
        Content: string | null;
      }

      export interface UpdateRes
        extends ResponseWithCode<ConsumptionImageResponseCode> {
        Attachment: { Content: string | null } | null;
      }
    }

    export namespace Liabilities {
      export interface Liability {
        Id: string;
        Name: string;
        GeneralType: GeneralTypeCode | null;
        PartyId: string | null;
        PartyName: string | null;
        StartDate: string | null;
        EndDate: string | null;
        DocumentNumber: string | null;
        Usage: UsageCode | null;
        Product: ProductCode | null;
        Type: TypeCode | null;
        Quantity: number | null;
        PriceItemRate: number | null;
        CurrencyCode: string | null;
      }

      export interface LiabilityDetails extends Liability {
        CreatedByName: string | null;
        CreatedOn: string | null;
        Description: string | null;
        ModifiedByName: string | null;
        ModifiedOn: string | null;
        OrganizationName: string | null;
      }

      export namespace List {
        export interface Response extends BaseResponse {
          Liabilities: Liability[];
        }
      }
      export namespace Item {
        export interface Response extends BaseResponse {
          Liability: LiabilityDetails | null;
        }
      }
      export namespace Parties {
        export interface Organization {
          Id: string;
          Name: string | null;
          Location: string | null;
        }

        export interface Response extends BaseResponse {
          Organizations: Organization[];
        }
      }
      export namespace Create {
        export interface Request {
          Name: string;
          Description: string | null;
          GeneralType: number;
          PartyId: string;
          StartDate: string | null;
          EndDate: string | null;
          DocumentNumber: string | null;
          Usage: number;
          Product: number;
          Type: number | null;
          Quantity: number;
          PriceItemRate: number;
        }
      }

      export namespace Update {
        export interface Request extends Create.Request {
          Id: string;
        }
      }
    }

    export namespace Comments {
      export interface Comment {
        CanDelete: boolean | null;
        CanEdit: boolean | null;
        CreatedOn: string | null;
        Description: string | null;
        DescriptionFormatted: string | null;
        Id: string;
        IsRead: boolean;
        ModifiedOn: string | null;
        OwnerId: string | null;
        OwnerImageUrl: string | null;
        OwnerName: string | null;
        ParentCommentId: string | null;
        RelatedComments: Comment[];
        State: number;
      }

      export namespace Get {
        export interface Response extends Model.BaseResponse {
          Comments: Comment[];
        }
      }

      export namespace Create {
        export interface Request {
          ParentCommentId: string | null;
          Description: string;
          DescriptionFormatted: string;
        }
        export interface Response extends Model.BaseResponse {
          Comment: Comment;
        }
      }

      export namespace Edit {
        export interface Request {
          Id: string;
          Description: string;
          DescriptionFormatted: string;
        }
      }
    }
  }

  class CRMConnector {
    protected getCurrentUserLcid = () => {
      return (window.parent as any).Xrm.Page.context.getUserLcid();
    };

    protected getCurrentUserId = () => {
      return (window.parent as any).Xrm.Page.context.getUserId();
    };

    protected getCurrentEntityId = () => {
      return (window.parent as any).Xrm.Page.data.entity.getId();
    };

    protected getLanguageCode = () => {
      const userLcid = this.getCurrentUserLcid();

      return userLcid === 1035 ? 'Finnish' : 'Default';
    };

    protected executeRequest = async (
      request: any,
      requestJson: any
    ): Promise<any> => {
      const requestXml = CrmAction.GenerateRequestXml(request, requestJson);

      return await new Promise((success, error) =>
        CrmAction.Execute({
          requestXml: requestXml,
          async: true,
          successCallback: (data: any) => {
            success(data.Response);
            console.log(data);
          },
          errorCallback: (data: any) => error(data.message),
        })
      );
    };

    protected executeTypeRequest = async (
      request: any,
      requestType: any,
      requestJson: any
    ): Promise<any> => {
      const requestXml = CrmAction.GenerateRequestWithTypeXml(
        request,
        requestType,
        requestJson
      );

      return await new Promise((success, error) =>
        CrmAction.Execute({
          requestXml: requestXml,
          async: true,
          successCallback: (data: any) => {
            success(data.Response);
            console.log(data);
          },
          errorCallback: (data: any) => error(data.message),
        })
      );
    };
  }
  export class FiscalYear extends CRMConnector {
    get = async (fiscalYearId: string) => {
      return await this.executeRequest('uds_FiscalYearRequest', {
        FiscalYearId: fiscalYearId,
      });
    };

    lock = async (
      fiscalYearId: string
    ): Promise<Model.FiscalYear.Lock.Response> => {
      return await this.executeRequest('uds_FiscalYearLock', {
        FiscalYearId: fiscalYearId,
        Lock: true,
      });
    };

    unlock = async (
      fiscalYearId: string
    ): Promise<Model.FiscalYear.Unlock.Response> => {
      return await this.executeRequest('uds_FiscalYearLock', {
        FiscalYearId: fiscalYearId,
        Lock: false,
      });
    };

    copy = async (
      fiscalYearId: string
    ): Promise<Model.FiscalYear.Copy.Response> => {
      return await this.executeRequest('uds_FiscalYearCopy', {
        FiscalYearId: fiscalYearId,
      });
    };

    validate = async (
      request: Model.FiscalYear.Validate.Request
    ): Promise<Model.FiscalYear.Validate.Response> => {
      return await this.executeRequest(
        'uds_FiscalYearChangesValidation',
        request
      );
    };

    save = async (
      request: Model.FiscalYear.Save.Request
    ): Promise<Model.FiscalYear.Save.Response> => {
      return await this.executeTypeRequest('uds_FiscalYearUpdate', 3, request);
    };
  }
  export class ConsumptionImage extends CRMConnector {
    get = async (fiscalYearId: string): Promise<Model.BaseResponse> => {
      return await this.executeTypeRequest(
        'uds_FiscalYearAttachmentRequest',
        2,
        {
          FiscalYearId: fiscalYearId,
        }
      );
    };
    update = async (
      request: Model.ConsumptionImage.UpdateReq
    ): Promise<Model.ConsumptionImage.UpdateRes> => {
      return await this.executeTypeRequest(
        'uds_FiscalYearAttachmentUpdateRequest',
        2,
        request
      );
    };
  }
  export class Liabilities extends CRMConnector {
    protected static _instance: Liabilities;

    constructor() {
      super();

      if (Liabilities._instance) {
        throw new Error(
          'Instantiation failed: ' +
            'use Liabilities.getInstance() instead of new.'
        );
      }

      Liabilities._instance = this;
    }

    public static getInstance(): Liabilities {
      return Liabilities._instance;
    }

    getList = async (
      fiscalYearId: string
    ): Promise<Model.Liabilities.List.Response> => {
      return await this.executeRequest('uds_FiscalYearLiabilitiesList', {
        FiscalYearId: fiscalYearId,
      });
    };
    getLiability = async (
      liabilityId: string
    ): Promise<Model.Liabilities.Item.Response> => {
      return await this.executeRequest('uds_FiscalYearLiability', {
        LiabilityId: liabilityId,
      });
    };
    getParties = async (
      searchKey: string | null
    ): Promise<Model.Liabilities.Parties.Response> => {
      return await this.executeRequest('uds_FiscalYearLiabilitiesPartiesList', {
        SearchKey: searchKey,
      });
    };
    create = async (
      coopId: string,
      newLiability: Model.Liabilities.Create.Request
    ): Promise<Model.BaseResponse> => {
      return await this.executeRequest('uds_FiscalYearLiabilityCreate', {
        CooperativeId: coopId,
        NewLiability: newLiability,
      });
    };
    update = async (
      updatedLiability: Model.Liabilities.Update.Request
    ): Promise<Model.BaseResponse> => {
      return await this.executeRequest('uds_FiscalYearLiabilityUpdate', {
        UpdatedLiability: updatedLiability,
      });
    };
    delete = async (liabilitiesIds: string[]): Promise<Model.BaseResponse> => {
      return await this.executeRequest('uds_FiscalYearLiabilityDelete', {
        LiabilitiesIds: liabilitiesIds,
      });
    };
  }
  export class Comments extends CRMConnector {
    get = async (
      fiscalYearId: string
    ): Promise<Model.Comments.Get.Response> => {
      return await this.executeRequest('uds_CommentGetList', {
        EntityId: fiscalYearId,
        EntityName: 'uds_fiscalyear',
      });
    };

    create = async (
      fiscalYearId: string,
      request: Model.Comments.Create.Request
    ): Promise<Model.Comments.Create.Response> => {
      return await this.executeRequest('uds_CommentCreate', {
        EntityId: fiscalYearId,
        EntityName: 'uds_fiscalyear',
        Comment: request,
      });
    };

    update = async (
      fiscalYearId: string,
      comment: Model.Comments.Edit.Request
    ): Promise<Model.BaseResponse> => {
      return await this.executeRequest('uds_CommentEdit', {
        EntityId: fiscalYearId,
        EntityName: 'uds_fiscalyear',
        Comment: comment,
      });
    };

    delete = async (
      fiscalYearId: string,
      commentId: string
    ): Promise<Model.BaseResponse> => {
      return await this.executeRequest('uds_CommentDelete', {
        EntityId: fiscalYearId,
        EntityName: 'uds_fiscalyear',
        CommentId: commentId,
      });
    };

    markAsRead = async (commentId: string): Promise<Model.BaseResponse> => {
      return await this.executeRequest('uds_CommentMarkRead', {
        CommentId: commentId,
      });
    };
  }
}

/* eslint-disable*/
import BaseResponse = Services.Model.BaseResponse;
import Liability = Services.Model.Liabilities.Liability;
import LiabilityDetails = Services.Model.Liabilities.LiabilityDetails;
import Comment = Services.Model.Comments.Comment;
import Organization = Services.Model.Liabilities.Parties.Organization;
import LiabilityFormBody = Services.Model.Liabilities.Create.Request;

export type { 
  Liability, 
  Comment, 
  LiabilityDetails, 
  Organization, 
  LiabilityFormBody, 
  BaseResponse 
};