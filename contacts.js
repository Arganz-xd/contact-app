const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// Membuat folder data jika belum ada.
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada.
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};

const saveContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.some((contact) => contact.nama === nama);
  if (duplikat) {
    throw new Error("Nama sudah terdaftar, gunakan nama lain!");
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      throw new Error("Email tidak valid!");
    }
  }

  // cek nomor HP
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    throw new Error("Nomor HP tidak valid!");
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold(`Contact berhasil ditambahkan!`));
};

const listContact = () => {
  const contacts = loadContact();
  if (contacts.length === 0) {
    throw new Error("Tidak ada contact yang disimpan!");
  }
  console.log(chalk.cyanBright.inverse.bold("Daftar Contact : "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} | ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    throw new Error(`${nama} tidak ditemukan!`);
  }

  console.log(chalk.cyanBright.inverse.bold(`${contact.nama}`));
  console.log(`Nomor HP : ${contact.noHP}`);
  if (contact.email) {
    console.log(`Email : ${contact.email}`);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  const index = contacts.findIndex(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (index === -1) {
    throw new Error(`${nama} tidak ditemukan!`);
  }

  contacts.splice(index, 1);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold(`Contact berhasil dihapus!`));
};

module.exports = { saveContact, listContact, detailContact, deleteContact };
