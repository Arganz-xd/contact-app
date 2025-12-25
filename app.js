const yargs = require("yargs");
const { saveContact, listContact, detailContact, deleteContact } = require("./contacts");

// Menambahkan contact baru
yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      const contact = {
        nama: argv.nama,
        email: argv.email,
        noHP: argv.noHP,
      };
      saveContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// Menampilkan semua contact
yargs.command({
  command: "list",
  describe: "Menampilkan contact",
  handler() {
    listContact();
  },
});

// Menampilkan detail sebuah contact berdasarkan nama contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// Menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
