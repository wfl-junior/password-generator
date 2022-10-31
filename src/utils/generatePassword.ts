interface GeneratePasswordOptions {
  includeNumbers: boolean;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeSymbols: boolean;
  length: number;
  numberCharacters: string;
  lowercaseCharacters: string;
  uppercaseCharacters: string;
  symbolCharacters: string;
  numberAmount: number;
  lowercaseAmount: number;
  uppercaseAmount: number;
  symbolAmount: number;
}

function shuffleString(str: string): string {
  return str
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function getRandomCharacter(characters: string): string {
  return shuffleString(characters)[0];
}

export function generatePassword({
  length,
  includeNumbers,
  includeLowercase,
  includeUppercase,
  includeSymbols,
  numberCharacters,
  lowercaseCharacters,
  uppercaseCharacters,
  symbolCharacters,
  numberAmount,
  lowercaseAmount,
  uppercaseAmount,
  symbolAmount,
}: GeneratePasswordOptions): string {
  let password = "";
  let characters = "";

  if (includeNumbers) {
    characters += numberCharacters;
  }

  if (includeLowercase) {
    characters += lowercaseCharacters;
  }

  if (includeUppercase) {
    characters += uppercaseCharacters;
  }

  if (includeSymbols) {
    characters += symbolCharacters;
  }

  const maxIterations = Math.max(
    numberAmount,
    lowercaseAmount,
    uppercaseAmount,
    symbolAmount,
  );

  for (let iteration = 1; iteration <= maxIterations; iteration++) {
    if (includeNumbers && iteration <= numberAmount) {
      password += getRandomCharacter(numberCharacters);
    }

    if (includeLowercase && iteration <= lowercaseAmount) {
      password += getRandomCharacter(lowercaseCharacters);
    }

    if (includeUppercase && iteration <= uppercaseAmount) {
      password += getRandomCharacter(uppercaseCharacters);
    }

    if (includeSymbols && iteration <= symbolAmount) {
      password += getRandomCharacter(symbolCharacters);
    }
  }

  while (password.length < length) {
    password += getRandomCharacter(characters);
  }

  return shuffleString(password);
}
