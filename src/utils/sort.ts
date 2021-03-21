export const sortObjectArray = (list: any[], fieldName: string) => {
  return list.sort((n1: any, n2: any) => {
    if (n1[fieldName] > n2[fieldName]) {
      return 1;
    }

    if (n1[fieldName] < n2[fieldName]) {
      return -1;
    }

    return 0;
  });
};
