import Aluno from '../models/Aluno'
import Foto from '../models/Foto'

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ["id", "nome", "sobrenome", "email", 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename']
      }
    })
    res.json(alunos)
  }

  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body)
      return res.json(novoAluno)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })

    }
  }
  async show(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id, {
        attributes: ["id", "nome", "sobrenome", "email", 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url','filename']
        }
      })
      if(!aluno){
        return res.status(400).json({
          errors: ['ID nao identificado']
        })
      }
      return res.json(aluno)
    } catch (e) {
      return res.status(400).json('erro')
    }
  }
  async delete(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id)
      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno nao existe"]
        })
      }
      await aluno.destroy()
      return res.json('aluno excluido')
    } catch (e) {
      return res.status(400).json('erro')
    }

  }
  async update(req, res) {
    try{
      const aluno = await Aluno.findByPk(req.params.id)
      if(!aluno){
        return res.status(400).json({
          errors: ["Aluno não identificado"]
        })
      }
      const novosDados = await aluno.update(req.body)
      return res.json(novosDados)

    }catch(e){
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }


}

export default new AlunoController()
