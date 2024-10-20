import express from 'express';

import { db } from '../db/index.js';
import type { User } from '../db/schema/user.js';
import type { ApiResponse } from '../interfaces/ApiResponse.js';

export const userRouter = express.Router();

type UserResponse = ApiResponse<{ user: User | null | undefined }>;

userRouter.get<{}, UserResponse>('/', async (req, res) => {
  const email = res.locals.session?.user?.email;

  if (!email) {
    return res.status(401).json({
      success: true,
      data: { user: null },
    });
  }

  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.email, email),
  });

  if (!user) {
    return res.status(401).json({
      success: true,
      data: { user: null },
    });
  }

  res.json({ success: true, data: { user } });
});
