const yargs = require("yargs");
const chalk = require("chalk");
const {
  saveContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

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
      try {
        saveContact(argv.nama, argv.email, argv.noHP);
      } catch (error) {
        console.log(
          chalk.red.inverse.bold(`Terjadi kesalahan : ${error.message}`)
        );
      }
    },
  })
  .demandCommand();

// Menampilkan semua contact
yargs.command({
  command: "list",
  describe: "Menampilkan contact",
  handler() {
    try {
      listContact();
    } catch (error) {
      console.log(
        chalk.red.inverse.bold(`Terjadi kesalahan : ${error.message}`)
      );
    }
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
    try {
      detailContact(argv.nama);
    } catch (error) {
      console.log(
        chalk.red.inverse.bold(`Terjadi kesalahan : ${error.message}`)
      );
    }
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
    try {
      deleteContact(argv.nama);
    } catch (error) {
      console.log(
        chalk.red.inverse.bold(`Terjadi kesalahan : ${error.message}`)
      );
    }
  },
});

yargs.parse();
