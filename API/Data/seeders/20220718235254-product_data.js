"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "produtos",
      [
        {
          id: 1,
          nome: "Barra de ferro",
          preco: 10,
          quantidade: 200,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 2,
          nome: "Pólvora",
          preco: 50,
          quantidade: 300,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 3,
          nome: "Madeira",
          preco: 75,
          quantidade: 200,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
