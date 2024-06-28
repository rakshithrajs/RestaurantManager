export const capitalize = (s) => {
    return s?.trim()[0].toUpperCase() + s?.trim().slice(1) ?? "";
};
