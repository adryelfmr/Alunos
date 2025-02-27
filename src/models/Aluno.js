import Sequelize, { Model } from 'sequelize'

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({

      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres'
          }
        }
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Sobrenome precisa ter entre 3 e 255 caracteres'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe'
        },
        validate: {
          isEmail: {
            msg: 'Email inválido'
          }
        }
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {

            msg: 'Idade precisa ser numero inteiro'
          }
        }
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {

            msg: 'Peso precisa ser um número natural'
          }
        }
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Altura precisa ser numero natural'
          }
        }
      },
    },
      {
        sequelize
      })
    return this;
  }
  static associate(models){
    this.hasMany(models.Foto, {foreignKey: 'aluno_id'})
  }
}
