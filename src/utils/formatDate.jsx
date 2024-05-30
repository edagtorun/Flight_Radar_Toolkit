import moment from "moment";

//unix formatindaki veriyi normal tarihe ceviren fonksiyon

const formatDate = (unix_time) => {
  // new Date methodu milisaniye uzerinden islem yapar ama unix time 1970"ten itibaren gecen sureyi saniye cinsinden verir bu yuzden new Date"i kullanabilmek icin saniyeyi 1000 ile carpip milisaniyeye cevirdik.
  const date = new Date(unix_time * 1000);

  // zamani kullanici dostu bir formata cevir
  return moment(date).calendar();
};

export default formatDate;
