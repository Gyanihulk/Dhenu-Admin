export const formatAddress = (address) => {
    if (!address) return "";
  
    const {
      address: addressLine,
      apt,
      state,
      city,
      country,
      zip_code,
    } = address;
  
    let formattedAddress = addressLine || "";
  
    if (apt) formattedAddress += `, Apt: ${apt}`;
    if (city) formattedAddress += `, City: ${city}`;
    if (state) formattedAddress += `, State: ${state}`;
    if (country) formattedAddress += `, Country: ${country}`;
    if (zip_code) formattedAddress += `, Zip Code: ${zip_code}`;
  
    return formattedAddress.trim();
  };