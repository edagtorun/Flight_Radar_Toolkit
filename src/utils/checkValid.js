//deger tanimsiz bos string veya 0 ise bilinmiyor dondurecek aksi taktirde veriyi dondurmeli
const checkValid = (value) => {
  return value === 0 || value === null || value === undefined || value === ""
    ? "Unknown"
    : value;
};

export default checkValid;
