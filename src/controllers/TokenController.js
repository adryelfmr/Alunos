import jwt from 'jsonwebtoken'
import User from '../models/User'

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body
      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credenciais inválidas']
        })
      }
      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        return res.status(401).json({
          errors: ['Usuario nao existe']
        })
      }
      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          errors: ['Senha inválida']
        })
      }
      const {id} = user
      const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      })
      return res.json({token, user: {nome: user.nome, id, email}})
    } catch (e) {
      console.log(e)
    }
  }
}

export default new TokenController()
