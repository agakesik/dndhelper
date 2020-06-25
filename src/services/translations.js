import LocalizedStrings from 'react-native-localization';

export const translations = new LocalizedStrings({
  en:{
    compactView: "compact View",
    shortRest: "short rest",
    longRest: "long rest",
    add: "add",
    edit: "edit",
    delete: "delete",
    close: "close",
    addNewAbility: "Add new ability",
    name: "name",
    numberOfUses: "number of uses",
    type: "type",
    errorEmptyName: "name can't be empty",
    errorDuplicateName: "name can't be repeated",
    errorNumber: "number of uses has to be a number (bigger than 0)",
    manageAbilities: "Manage abilities",
  },
  pl: {
    compactView: "widok kompaktory",
    shortRest: "krótki odpoczynek",
    longRest: "długi odpoczynek",
    add: "dodaj",
    edit: "edytuj",
    delete: "usuń",
    close: "zamknij",
    addNewAbility: "Dodaj nową umiejętność",
    name: "nazwa",
    numberOfUses: "liczba użyć",
    type: "rodzaj",
    errorEmptyName: "nazwa nie moze być pusta",
    errorDuplicateName: "nazwa nie moze się powtarzać",
    errorNumber: "liczba użyć musi być cyfrą (większą niż 0)",
    manageAbilities: "Zarządzaj umiejetnościami",
  }
 });