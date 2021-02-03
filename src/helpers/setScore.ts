import { obliczBonus } from "./bonusCalculator";

interface Score {
  firstStep: string;
  secondStep: string;
  thirdStep: string[];
  fourthStep: string;
  fifthStep: number;
}

interface Data {
  // byDevice: { [key: string]: { [key: string]: string | number }[] }; //deviceAndSkillData
  byDevice: Record<string, Record<string, (string | number)>[]>;
  multipiers: Record<string, Record<string, (string | number)>[]>; //multipierData
  disciplines: Record<string, (string | number)>[];
}

interface Result {
  bookmaker: string; 
  skill: string; 
  device: string; 
  usesDisciplines: string[];
}

const nameSet = (name: string): string => {
  let discipline = '';
  switch (name) {
    case 'piłka nożna':
      discipline = 'piłkę nożną';
      break;
    case 'koszykówka':
      discipline = 'koszykówkę';
      break;
    case 'esport':
      discipline = 'esport';
      break
    case 'sporty wirtualne':
      discipline = 'wirtualne sporty';
      break;
    case 'tenis ziemny':
      discipline = 'tenis ziemny';
      break;
    case 'hokej':
      discipline = 'hokej';
      break;
    case 'siatkówka':
      discipline = 'siatkówkę';
      break;
    case 'inne':
      discipline = 'inne';
      break;
    case 'sporty walki':
      discipline = 'sporty walki';
      break;
  }
  return discipline;
}

const pointHandler = (result: Result, data: Data) => {
 
  const pointBySkill = data.byDevice[result.bookmaker].find(b => b.skills === result.skill)!.point;
  const pointByDevice = result.device === "no-preferrences" ? 0 : data.byDevice[result.bookmaker].find(b => b.skills === result.skill)![result.device];
  const infoAboutMultipiers = data.multipiers[result.bookmaker]!.find(b => b.skills === result.skill);
  //!Temporary commented - for future version
  // const pointsByMultipiers = Number(infoAboutMultipiers!.cashout) + Number(infoAboutMultipiers!.tv) + Number(infoAboutMultipiers!.vip) + Number(infoAboutMultipiers!.special);
  const pointsByMultipiers = 0;
  const pointsByDisciplines: number[] = data.disciplines.map(d => {
    if (result.usesDisciplines.includes(d.name as string)) return Number(d[result.bookmaker]);
    else return 0;
  });
  
  return [Number(pointBySkill), Number(pointByDevice), Number(pointsByMultipiers), ...pointsByDisciplines];
}

export const getBook = (score: Score, data: Data, useBonus: boolean) => {
  const punktyFortuna: number[] = [];
  const punktyBetfan: number[] = [];
  const punktyTotalbet: number[] = [];
  const punktySTS: number[] = [];
  const punktyTotolotek: number[] = [];
  const punktyforBET: number[] = [];
  const punktyBetclic: number[] = [];
  const punktyLVBET: number[] = [];
  const punktyETOTO: number[] = [];
  const punktyPZBuk: number[] = [];

  const dataToCalc: Result = {
    bookmaker: '',
    skill: score.firstStep,
    device: score.secondStep,
    usesDisciplines: score.thirdStep
  }

  punktyFortuna.push(...pointHandler({...dataToCalc, bookmaker: 'Fortuna'}, data));
  punktyBetfan.push(...pointHandler({ ...dataToCalc, bookmaker: "Betfan" }, data));
  punktyTotalbet.push(...pointHandler({ ...dataToCalc, bookmaker: "Totalbet" }, data));
  punktySTS.push(...pointHandler({ ...dataToCalc, bookmaker: "STS" }, data));
  punktyTotolotek.push(...pointHandler({ ...dataToCalc, bookmaker: "Totolotek" }, data));
  punktyforBET.push(...pointHandler({ ...dataToCalc, bookmaker: "forBET" }, data));
  punktyBetclic.push(...pointHandler({ ...dataToCalc, bookmaker: "Betclic" }, data));
  punktyLVBET.push(...pointHandler({ ...dataToCalc, bookmaker: "LVBET" }, data));
  punktyETOTO.push(...pointHandler({ ...dataToCalc, bookmaker: "ETOTO" }, data));
  punktyPZBuk.push(...pointHandler({ ...dataToCalc, bookmaker: "PZBuk" }, data));

  // // wyniki cząstkowe
  const results: {[key: string]: number} = {
    Fortuna: punktyFortuna.reduce((a, b) => Number(a) + Number(b), 0),
    STS: punktySTS.reduce((a, b) => Number(a) + Number(b), 0),
    Betfan: punktyBetfan.reduce((a, b) => Number(a) + Number(b), 0),
    Totolotek: punktyTotolotek.reduce((a, b) => Number(a) + Number(b), 0),
    Totalbet: punktyTotalbet.reduce((a, b) => Number(a) + Number(b), 0),
    forBET: punktyforBET.reduce((a, b) => Number(a) + Number(b), 0),
    Betclic: punktyBetclic.reduce((a, b) => Number(a) + Number(b), 0),
    LVBET: punktyLVBET.reduce((a, b) => Number(a) + Number(b), 0),
    ETOTO: punktyETOTO.reduce((a, b) => Number(a) + Number(b), 0),
    PZBuk: punktyPZBuk.reduce((a, b) => Number(a) + Number(b), 0),
  }

  const depositValues = {
    Fortuna: obliczBonus(`${score.fifthStep}`, 'Fortuna'),
    STS: obliczBonus(`${score.fifthStep}`, 'STS'),
    Betfan: obliczBonus(`${score.fifthStep}`, 'Betfan'),
    Totolotek: obliczBonus(`${score.fifthStep}`, 'Totolotek'),
    Totalbet: obliczBonus(`${score.fifthStep}`, 'Totalbet'),
    forBET: obliczBonus(`${score.fifthStep}`, 'forBET'),
    Betclic: obliczBonus(`${score.fifthStep}`, 'Betclic'),
    LVBET: obliczBonus(`${score.fifthStep}`, 'LVBET'),
    ETOTO: obliczBonus(`${score.fifthStep}`, 'ETOTO'),
    PZBuk: obliczBonus(`${score.fifthStep}`, 'PZBuk'),
  }
  
  const depositMultipiers = Object.entries(depositValues).sort(([,a], [,b]) => b-a).map(([key, values], index) => [key, 2 - index/10]);
  const mapOfDepositMultipiers = Object.fromEntries(depositMultipiers)
  
  const resultWithDepositMultipier: {[key: string]: number} = {}
  
  for (const book in results) {
    resultWithDepositMultipier[book] = Number((results[book] * mapOfDepositMultipiers[book]).toFixed());
  };
  
  const result = useBonus 
    ? Object.keys(resultWithDepositMultipier).reduce((a, b) => results[a] > results[b] ? a : b) 
    : Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);
    
  const tekstIndywidualnyPoziom 
    = score.firstStep === "weak" ? "początkujących graczy" 
    : score.firstStep === "medium" ? "graczy z doświadczeniem" 
    : "doświadczonych i wymagających graczy";
  const tekstIndywidualnyUrzadzenie 
    = score.secondStep === "mobile" ? "na smartfonach i tabletach"
    : score.secondStep === "comp" ? "w przeglądarce komputera"
    : "na każdym urządzeniu";
  const tekstIndywidualnyDyscypliny = score.thirdStep.map(discipline => nameSet(discipline)).join(", ");

  return {
    result,
    tekstIndywidualnyPoziom,
    tekstIndywidualnyUrzadzenie,
    tekstIndywidualnyDyscypliny
  };
}