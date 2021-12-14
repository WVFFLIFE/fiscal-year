import { OptionalNumber, OptionalString } from 'models';

type ProductType = 'property-maintenance' | 'vat-calculation';
type ProductProperty = 'productName' | 'surplusDeficitPreviousFY';

type Options = ({ type: ProductType } | { type: 'product'; index: number }) & {
  property: ProductProperty;
};

function getRequestFieldName(options: Options) {
  const { type, property } = options;
  switch (type) {
    case 'product':
      return property === 'productName'
        ? `SpecFinCalcProductName${options.index}`
        : `SpecFinCalcSurplusDeficitPreviousFY${options.index}`;
    case 'property-maintenance':
      return property === 'productName'
        ? `PropertyMeintenanceProductName`
        : 'PropertyMeintenanceSurplusDeficitPreviousFY';
    case 'vat-calculation':
      return property === 'productName'
        ? `VATCalculationsProductName`
        : 'VATCalculationsSurplusDeficitPreviousFY';
  }
}

type SaveInput = { [key: string]: OptionalString | OptionalNumber };

export function savingInterceptor<
  Output extends OptionalString | OptionalNumber,
  ArgumentsType extends any[],
  ReturnType
>(
  output: Output,
  options: Options,
  saveHandler: (saveInput: SaveInput, ...args: ArgumentsType) => ReturnType,
  ...args: ArgumentsType
): ReturnType {
  let requestFieldName = getRequestFieldName(options);

  return saveHandler({ [requestFieldName]: output }, ...args);
}
