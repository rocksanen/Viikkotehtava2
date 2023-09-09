import express from 'express';
import {
  checkToken,
  userDeleteCurrent,
  userGet,
  userListGet,
  userPost,
  userPutCurrent,
} from '../controllers/userController';
import passport from '../../passport';
import { body } from 'express-validator';

const router = express.Router();

// TODO: add validation

router
  .route('/')
  .get(userListGet)
  .post(
    userPost,
    body('user_name').isString().isLength({min: 1}),
    body('email').isEmail(),
    body('role').isString().isLength({min: 1}),
    body('password').isString().isLength({min: 1})
  )
  .put(passport.authenticate('jwt', {session: false}), userPutCurrent)
  .delete(passport.authenticate('jwt', {session: false}), userDeleteCurrent);

router.get(
  '/token',
  passport.authenticate('jwt', {session: false}),
  checkToken
);

router.route('/:id').get(userGet);

export default router;
