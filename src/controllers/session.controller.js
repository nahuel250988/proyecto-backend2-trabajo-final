import UserRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../config/constants.js';
import MailingService from '../services/mailing.service.js';

class SessionController {
  constructor() {
    this.userRepository = new UserRepository();
    this.mailingService = new MailingService();
  }

  async register(req, res) {
    try {
      const userData = req.body;
      const newUser = await this.userRepository.registerUser(userData);
      res.status(201).json({ status: 'success', message: 'Usuario registrado', payload: newUser });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  async login(req, res) {
    try {
      const user = req.user;
      const payload = { id: user.id, email: user.email, role: user.role };
      const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: '1h' });
      res.json({ status: 'success', token });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async getCurrentUser(req, res) {
    res.json({ status: 'success', payload: req.user });
  }

  async sendPasswordRecoveryEmail(req, res) {
    try {
      const { email } = req.body;
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
      }

      const token = jwt.sign({ email }, PRIVATE_KEY, { expiresIn: '1h' });
      const recoveryLink = `http://localhost:8080/reset-password?token=${token}`;

      await this.mailingService.sendMail({
        to: email,
        subject: 'Recuperación de Contraseña',
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${recoveryLink}">Restablecer Contraseña</a></p>`
      });

      res.json({ status: 'success', message: 'Correo de recuperación enviado' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      const decoded = jwt.verify(token, PRIVATE_KEY);
      const user = await this.userRepository.findUserByEmail(decoded.email);

      if (!user) {
        return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
      }
      
      const updatedUser = await this.userRepository.updateUser(user.id, { password: newPassword });
      
      res.json({ status: 'success', message: 'Contraseña actualizada' });
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Token inválido o expirado' });
    }
  }
}

export default new SessionController();