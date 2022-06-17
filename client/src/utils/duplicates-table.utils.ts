import { NumberLiteralType } from "typescript";
import { FORMATTED_DATA, UNFORMATTED_DATA } from "../state/actions/document"
import { SelectedDocument } from "../state/reducers/document";
import { FREE, FREE_COMPARISONS_LIMIT, UserState } from "../state/reducers/user";

export const isSubmitButtonEnabled = (
  fileStructure1: string,
  fileStructure2: string,
  comparisonColumns1: Array<string>,
  comparisonColumns2: Array<string>,
  unformattedData1: string,
  unformattedData2: string,
  selectedDocument1: SelectedDocument,
  selectedDocument2: SelectedDocument,
  userFreeComparisons: number,
  userSubscriptionType: string
): boolean => {
  const isUserAccountDataValid = checkOnePersonsAccountData(
    fileStructure1,
    selectedDocument1,
    comparisonColumns1,
    unformattedData1
  );
  const isPartnerAccountDataValid = checkOnePersonsAccountData(
    fileStructure2,
    selectedDocument2,
    comparisonColumns2,
    unformattedData2
  );

  if (fileStructure1 === FORMATTED_DATA && fileStructure2 === FORMATTED_DATA) {
    if (comparisonColumns1.length !== comparisonColumns2.length) {
      return false;
    }
  }

  const userCanMakeComparisons: boolean = !isUserOutOfFreeComparisons(userFreeComparisons, userSubscriptionType);

  return isUserAccountDataValid && isPartnerAccountDataValid && userCanMakeComparisons;
}

export const checkOnePersonsAccountData = (
  fileStructure: string,
  selectedDocument: SelectedDocument,
  comparisonColumns: Array<string>,
  unformattedData: string
) => {
  if (fileStructure === FORMATTED_DATA) {
    if (!selectedDocument || !selectedDocument.data || !selectedDocument.data.length) {
      return false;
    }
    if (!comparisonColumns || !comparisonColumns.length) {
      return false;
    }
  } else if (fileStructure === UNFORMATTED_DATA) {
    if (!unformattedData || !unformattedData.length) {
      return false;
    }
  }
  return true;
}

export const createCapitalizedPartnerName = (partnerName: string) => {
  if (partnerName) {
    return capitalizeFirstLetterOfWord(partnerName);
  }
  return '';
}

export const createCapitalizedPartnerCompany = (partnerCompany: string) => {
  if (partnerCompany) {
    const words: Array<string> = partnerCompany.split(" ");
    return words.map((word: string) => capitalizeFirstLetterOfWord(word)).join(" ");
  }
  return '';
}

export const createCapitalizedUserName = (user: UserState) => {
  if (user && user.firstname && user.lastname) {
    const capitalizedFirstName = capitalizeFirstLetterOfWord(user.firstname);
    const capitalizedLastName = capitalizeFirstLetterOfWord(user.lastname);
    return `${capitalizedFirstName} ${capitalizedLastName}`;
  }
  return '';
}

export const capitalizeFirstLetterOfWord = (word: string) => word[0].toUpperCase() + word.substring(1);

export const isUserOutOfFreeComparisons = (userFreeComparisons: number, userSubscriptionType: string) => {
  if (userSubscriptionType === FREE && userFreeComparisons >= FREE_COMPARISONS_LIMIT) {
    return true;
  }
  return false;
}