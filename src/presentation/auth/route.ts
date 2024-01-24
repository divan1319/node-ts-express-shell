import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService, EmailService } from '../services';
import { envs } from '../../config';





export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    
    const emailServices = new EmailService(envs.MAILER_SERVICE,envs.EMAIL,envs.EMAIL_KEY,envs.SEND_EMAIL)

    const authService = new AuthService(emailServices)
    
    const controller = new AuthController(authService)
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    router.post('/login', controller.loginUser);
    router.post('/register',controller.registerUser)
    router.get('/validate-email/:token',controller.validateUser)


    return router;
  }


}