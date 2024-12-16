'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Agregar la columna 'respuesta' en la tabla 'mensajes'
    await queryInterface.addColumn('mensajes', 'respuesta', {
      type: Sequelize.STRING(200), // Tamaño máximo de 200 caracteres
      allowNull: true, // Permite valores nulos
    });
  },

  async down (queryInterface, Sequelize) {
    // Eliminar la columna 'respuesta' si se revierte la migración
    await queryInterface.removeColumn('mensajes', 'respuesta');
  }
};
