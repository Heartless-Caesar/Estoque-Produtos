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
      "estoques",
      [
        {
          id: 1,
          nome: "estoque_1",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 2,
          nome: "estoque_2",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 3,
          nome: "estoque_3",
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
