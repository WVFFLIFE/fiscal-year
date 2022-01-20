import hasPrevFiscalYear from './hasPrevFiscalYear';

describe('test hasPrevFiscalYear function', () => {
  const mockFiscalYearList = [
    {
      Id: '245301e6-a23e-e911-810f-005056ac126a',
      Name: 'As Oy Demotalo Fiscal Year 01/01/2017 – 31/12/2017',
      StartDate: '2016-12-31T22:00:00Z',
      EndDate: '2017-12-30T22:00:00Z',
      IsClosed: false,
    },
    {
      Id: 'd08a52ea-04d1-e811-810c-005056ac5819',
      Name: 'As Oy Demotalo Tilikausi 1.1.2018 - 31.12.2018',
      StartDate: '2017-12-31T22:00:00Z',
      EndDate: '2018-12-30T22:00:00Z',
      IsClosed: false,
    },
    {
      Id: 'c07b8fa9-aaf9-e911-810e-005056ac5877',
      Name: 'As Oy Demotalo Fiscal Year 01/01/2020 – 31/12/2020',
      StartDate: '2019-12-31T22:00:00Z',
      EndDate: '2020-12-30T22:00:00Z',
      IsClosed: false,
    },
  ];

  it('list has previous fiscal year', () => {
    expect(
      hasPrevFiscalYear(mockFiscalYearList[1], mockFiscalYearList)
    ).toEqual(true);
    expect(
      hasPrevFiscalYear(mockFiscalYearList[2], mockFiscalYearList)
    ).toEqual(true);
  });

  it('list has no previous fiscal year', () => {
    expect(
      hasPrevFiscalYear(mockFiscalYearList[0], mockFiscalYearList)
    ).toEqual(false);
  });
});
