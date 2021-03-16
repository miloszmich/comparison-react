

export interface StandardObject {
  [key: string]: string | number;
}

export interface ExcelTableData extends StandardObject {
  _chk2m: string | number;
  _ciyn3: string | number;
  _ckd7g: string | number;
  _clrrx: string | number;
  _cn6ca: string | number;
  _cokwr: string | number;
  _cpzh4: string | number;
  _cre1l: string | number;
  _cssly: string | number;
  _cu76f: string | number;
  _cvlqs: string | number;
  _cx0b9: string | number;
  _cyevm: string | number;
  _cztg3: string | number;
  _d2mkx: string | number;
  _d9ney: string | number;
  _d180g: string | number;
  _db1zf: string | number;
  _dcgjs: string | number;
  _ddv49: string | number;
}

export interface ExcelScore extends StandardObject {
  "both":  number;
  "cashout": number;
  "debiutant": number;
  "desktop": number;
  "esport": number;
  "hokej": number;
  "inne": number;
  "koszykówka": number;
  "legenda": number;
  "mobile": number;
  "piłka nożna": number;
  "siatkówka": number;
  "sporty walki": number;
  "tenis ziemny": number;
  "tv": number;
  "vip": number;
  "wirtualne sporty": number;
  "średniozaawansowany": number;
}

export const pointConverter = (data: ExcelTableData[]): Record<string, Record<string, string | number>> => {

  const headers = data[1];
  const usedData = data.splice(2, data.length - 1);

  const bookmakers: Record<string, Record<string, number | string>> = {};

  usedData.forEach(book => {
    bookmakers[book._cn6ca] = {};


    for (const key in headers) {
      if (key === '_cn6ca') continue;
      bookmakers[book._cn6ca][headers[key].toString().toLowerCase()] = book[key];
    }
  });

  return bookmakers;
};

export const userChoiceConverter = (step: number, choice: number | number[]) => {


};