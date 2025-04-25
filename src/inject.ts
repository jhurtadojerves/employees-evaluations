import express, { Application } from 'express';

import AuthController from '#controllers/auth.controller';
import AuthRouter from '#routes/auth.route';
import Employee from '#models/Employee';
import EmployeeController from '#controllers/employee.controller';
import EmployeeRouter from '#routes/employee.route';
import { EmployeeService } from '#services/employee.service';
import Evaluation from '#models/Evaluation';
import EvaluationController from '#controllers/evaluation.controller';
import EvaluationRouter from '#routes/evaluation.route';
import { EvaluationService } from '#services/evaluation.service';
import Question from '#models/Question';
import QuestionController from '#controllers/question.controller';
import QuestionRouter from '#routes/question.route';
import { QuestionService } from '#services/question.service';
import User from '#/models/User';
import UserController from '#controllers/user.controller';
import UserRouter from '#routes/user.route';
import { UserService } from '#services/user.service';
import config from '#config';

const secrets = config.secrets;
const { jwt, jwtDuration } = secrets;
export const port = config.server.port;
export const expressApp: Application = express();

// Repositories
const userRepository = User;
const employeeRepository = Employee;
const questionRepository = Question;
const evaluationRepository = Evaluation;

// Services
const userService = new UserService(userRepository, jwt, jwtDuration);
const employeeService = new EmployeeService(employeeRepository, userRepository);
const questionService = new QuestionService(questionRepository);
const evaluationService = new EvaluationService(evaluationRepository);

// Controllers
const authController = new AuthController(userService);
const employeeController = new EmployeeController(employeeService);
const userController = new UserController(userService);
const questionController = new QuestionController(questionService);
const evaluationController = new EvaluationController(evaluationService);

// Routers
export const authRouter = new AuthRouter(authController);
export const employeeRouter = new EmployeeRouter(employeeController);
export const userRouter = new UserRouter(userController);
export const questionRouter = new QuestionRouter(questionController);
export const evaluationRouter = new EvaluationRouter(evaluationController);

export const routes = [authRouter, employeeRouter, userRouter, questionRouter, evaluationRouter];
