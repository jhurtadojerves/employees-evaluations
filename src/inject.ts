import express, { Application } from 'express';

import AuthController from '#controllers/auth.controller';
import AuthRouter from '#routes/auth.route';
import { EmployeService } from '#services/employee.service';
import Employee from '#models/Employee';
import EmployeeController from '#controllers/employee.controller';
import EmployeeRouter from '#routes/employee.route';
import User from '#/models/User';
import { UserService } from '#services/user.service';
import config from '#config';

const JWT_SECRET = config.secrets.jwt;

const userRepository = User;
const employeeRepository = Employee;
const userService = new UserService(userRepository, JWT_SECRET);
const employeeService = new EmployeService(employeeRepository, userRepository);
const authController = new AuthController(userService);
const employeeController = new EmployeeController(employeeService);

export const expressApp: Application = express();
export const authRouter = new AuthRouter(authController);
export const employeeRouter = new EmployeeRouter(employeeController);
export const port = config.server.port;
