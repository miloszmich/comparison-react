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

const pointHandler = (result: Result, data: Data) => {
 
  const pointBySkill = data.byDevice[result.bookmaker].find(b => b.skills === result.skill)!.point;
  const pointByDevice = result.device === "no-preferrences" ? 0 : data.byDevice[result.bookmaker].find(b => b.skills === result.skill)![result.device];
  const infoAboutMultipiers = data.multipiers[result.bookmaker]!.find(b => b.skills === result.skill);
  const pointsByMultipiers = Number(infoAboutMultipiers!.cashout) + Number(infoAboutMultipiers!.tv) + Number(infoAboutMultipiers!.vip) + Number(infoAboutMultipiers!.special);
  const pointsByDisciplines: number[] = data.disciplines.map(d => {
    if (result.usesDisciplines.includes(d.name as string)) return Number(d[result.bookmaker]);
    else return 0;
  });
  
  return [Number(pointBySkill), Number(pointByDevice), Number(pointsByMultipiers), ...pointsByDisciplines];
}

export const getBook = (score: Score, data: Data) => {
  const punktyFortuna: number[] = [];
  const punktyBetfan: number[] = [];
  const punktyTotalbet: number[] = [];
  const punktySTS: number[] = [];
  const punktyTotolotek: number[] = [];

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

  // // wyniki cząstkowe
  const results: {[key: string]: number} = {
    Fortuna: punktyFortuna.reduce((a, b) => Number(a) + Number(b), 0),
    STS: punktySTS.reduce((a, b) => Number(a) + Number(b), 0),
    Betfan: punktyBetfan.reduce((a, b) => Number(a) + Number(b), 0),
    Totolotek: punktyTotolotek.reduce((a, b) => Number(a) + Number(b), 0),
    Totalbet: punktyTotalbet.reduce((a, b) => Number(a) + Number(b), 0),
  }

  const result = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);
  const tekstIndywidualnyPoziom 
    = score.firstStep === "weak" ? "początkujących" 
    : score.firstStep === "medium" ? "średnio-zaawansowanych" 
    : "doświadczonych";
  const tekstIndywidualnyUrzadzenie 
    = score.secondStep === "mobile" ? "smartfony/tablety"
    : score.secondStep === "comp" ? "komputer"
    : "na dowolne urządzenie";
  const tekstIndywidualnyDyscypliny = score.thirdStep.join(", ");

  return {
    result,
    tekstIndywidualnyPoziom,
    tekstIndywidualnyUrzadzenie,
    tekstIndywidualnyDyscypliny
  };
}