const { question, saveContact } = require("./contacts");

const main = async () => {
  const nama = await question("Masukkan nama anda : ");
  const email = await question("Masukkan email anda : ");
  const noHP = await question("Masukkan nomor HP anda : ");

  saveContact(nama, email, noHP);
};

main();
