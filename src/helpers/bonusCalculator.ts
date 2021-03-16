 const obliczBonusBetx = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let freebet = 30;
	let bonus = 0;
	let cashback = 0;

	if (depozyt >= 5) {
		bonus = depozyt;
		if (bonus > 5000) {
			bonus = 5000;
		}

		cashback = depozyt;
		if (cashback > 200) {
			cashback = 200;
		}
	} else {
		depozyt = 0;
	}

	return depozyt + bonus + cashback + freebet;
}

 const obliczBonusPzbuk = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let freebet = 0;
	let cashback = 0;

	if (depozyt >= 50) {
		freebet = 200;
	}

	if (depozyt >= 5) {
		cashback = depozyt;
		if (depozyt >= 500) {
			cashback = 500;
		}
	} else {
		depozyt = 0;
	}

	return depozyt + cashback + freebet;
}

 const obliczBonusFortuna = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let bonus = (depozyt < 1000) ? depozyt : 1000;
	let cashback = 0;

	// if (depozyt == 0) { return 60; }

	if (depozyt < 1) {
		depozyt = 0;
		bonus = 0;
	}

	if (bonus > 1000) {
		bonus = 1000;
	}

	if (depozyt >= 2) {
		cashback = (depozyt * 0.88 < 210) ? depozyt * 0.88 : 210;
	}

	let freebet = 20;

	bonus = depozyt + bonus + cashback + freebet;

	return bonus;
}


 const obliczBonusBetfan = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let bonus = 0;
	let cashback = depozyt;
	
	if (depozyt < 2) {
		depozyt = 0;
	}


	if (depozyt < 50) cashback = 0;
	if (cashback > 600) cashback = 600;

	return depozyt + bonus + cashback;
}


 const obliczBonusSts = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let bonus = (depozyt < 1200) ? depozyt : 1200;
	let cashback = 0;
	let cashback2 = 0;

	let additionalCashBack = 0;
	if (depozyt > 59) additionalCashBack = 1.76;
	if (depozyt > 64) additionalCashBack = 6.16;
	if (depozyt > 74) additionalCashBack = 14.96;
	if (depozyt > 79) additionalCashBack = 19.36;
	if (depozyt > 80) additionalCashBack = 20;

	

	if (depozyt < 1) {
		bonus = 0;
	}

	if (depozyt >= 2) {
		cashback = (depozyt * 0.88 < 30) ? depozyt * 0.88 : 30;
	}

	if (depozyt >= 37) {
		cashback2 = ((depozyt - 35)* 0.88 < 20) ? (depozyt - 35)* 0.88 : 20;
	}

	let freebet = 29;

	//Temporary add 20 as additional cashback
	bonus = depozyt + bonus + cashback + cashback2 + freebet + additionalCashBack;

	return bonus;
}


 const obliczBonusForbet = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let bonus = (depozyt <= 2000) ? depozyt : 2000;
	let extra = 0;

	if (depozyt < 1) {
		return 0;
	}

	if (depozyt < 20) {
		return depozyt;
	}

	if (depozyt >= 100) {
		extra = 50;
	}

	bonus = depozyt + bonus + extra;

	return bonus;
}


 const obliczBonusBetclic = (kwota: string): number => {
	let bonus = 0;
	let depozyt = parseFloat(kwota);

	if (depozyt < 1) {
		return 0;
	}

	let cashback = (depozyt * 0.88 < 550) ? depozyt * 0.88 : 550;

	bonus = depozyt + cashback;

	return bonus;
}


 const obliczBonusEtoto = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let bonus = 0;

	if (depozyt < 1) {
		return depozyt;
	}

	bonus = depozyt;
	
	if (depozyt > 1500) {
		bonus = 1500;
	}

	return depozyt + bonus;
}


 const obliczBonusTotolotek = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let bonusStart = 20;
	let bonus = 0;

	if (depozyt >= 20) {
		bonus = (depozyt <= 500) ? depozyt : 500;
	}

	return depozyt < 4 ? bonusStart : depozyt + bonus + bonusStart;
}


 const obliczBonusLvbet = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let bonus = 0;
	let freebet = 20;

	if (depozyt < 10) {
		depozyt = 0;
	}

	if (depozyt >= 20) {
		bonus = depozyt * 0.1;
	}

	if (depozyt >= 50) {
		bonus = depozyt;
	}

	if (bonus > 1000) {
		bonus = 1000;
	}

	return depozyt + bonus + freebet;
}

 const obliczBonusLvbet2 = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let bonus = 0;
	let freebet = 20;

	if (depozyt > 10) {
		bonus = depozyt / 10;
	}

	if (depozyt >= 50) {
		bonus = depozyt;
	}

	if (bonus > 2000) {
		bonus = 2000;
	}

	return depozyt < 10 ? freebet : depozyt + bonus + freebet;
}

 const obliczBonusTotalbet = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let bonus = 0;
	let freebet = 25;
	let dodatkowyFreebet = 0;

	if (depozyt < 1) {
		depozyt = 0;
	}

	if (depozyt >= 10) {
		bonus = depozyt;
		dodatkowyFreebet = 5;
	}

	if (bonus > 5000) {
		bonus = 5000;
	}

	return depozyt + bonus + freebet + dodatkowyFreebet;
}

 const obliczBonusMilenium = (kwota: string): number => {
	let depozyt = parseFloat(kwota);
	let cashback = 0;
	let freebet = 0;
	let bonus = 0;

	if (depozyt < 1) { depozyt = 0; }

	if (depozyt >= 1) { cashback = depozyt; }
	if (cashback > 100) { cashback = 100; }

	if (depozyt >= 1) { bonus = depozyt; }
	if (bonus > 1500) { bonus = 1500; }

	if (depozyt >= 50) { freebet = 20; }

	return depozyt + bonus + cashback + freebet;
}

export const obliczBonus = (deposit: string, book: string): number => {
	let result: number = 0;

	switch (book) {
		case "Fortuna":
			result = obliczBonusFortuna(deposit);
		break;

		case "Betfan":
			result = obliczBonusBetfan(deposit);
		break;

		case "STS":
			result = obliczBonusSts(deposit);
		break;

		case "forBET":
			result = obliczBonusForbet(deposit);
		break;

		case "ETOTO":
			result = obliczBonusEtoto(deposit);
		break;

		case "Betclic":
			result = obliczBonusBetclic(deposit);
		break;

		case "Totolotek":
			result = obliczBonusTotolotek(deposit);
		break;

		case "LVBET":
			result = obliczBonusLvbet2(deposit);
		break;

		case "Totalbet":
			result = obliczBonusTotalbet(deposit);
		break;

		case "milenium":
			result = obliczBonusMilenium(deposit);
		break;

		case "betx":
			result = obliczBonusBetx(deposit);
		break;

		case "PZBuk":
			result = obliczBonusPzbuk(deposit);
		break;
	}


	if (isNaN(result)) {
		result = 0;
	}

	return Number(result.toFixed(2));


}