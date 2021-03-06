import React, { useState } from "react";

import Country from "../models/Country";
import countryList from "../data/countries";

export const CountryContext = React.createContext([] as Country[]);

export function CountryProvider({ children }: any) {
  const [countries] = useState<Country[]>(countryList);

  return (
    <CountryContext.Provider value={countries}>
      {children}
    </CountryContext.Provider>
  );
}
