import {Router} from "express";
import {generate} from "generate-password";
import * as jwt from "jsonwebtoken";
import {
  AUTH_REFRESH_TOKEN_SECRET,
  AUTH_TOKEN_SECRET,
  JWT_AUDIENCE,
  JWT_AUTH_REFRESH_TOKEN_EXPIRED,
  JWT_AUTH_TOKEN_EXPIRED,
  JWT_ISSUER, TOKEN_REGISTER_SECRET,
} from "../config/token";
import profile from "../mock/profile.json";

const router = Router();

// Registration
router.post("/register", (_, res) => {
  const generatedOTP = generate({length: 16, numbers: true});
  const tokenPayload = {
    otp: `KUMO-${generatedOTP}`,
    email: profile.email,
    fullname: profile.fullname,
    phone: profile.phone,
  };
  const token = jwt.sign(tokenPayload, TOKEN_REGISTER_SECRET, {
    algorithm: "HS256",
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    expiresIn: "15m",
  });

  const response = {
    code: 201,
    status: "success",
    data: {
      token,
    },
  };
  res.json(response);
});

// OTP Registration
router.post("/register/otp", (_, res) => {
  const tokenPayload = {
    id: profile.id,
  };

  const token = jwt.sign(tokenPayload, AUTH_TOKEN_SECRET, {
    algorithm: "HS256",
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    expiresIn: JWT_AUTH_TOKEN_EXPIRED,
  });
  const refreshToken = jwt.sign(tokenPayload, AUTH_REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    expiresIn: JWT_AUTH_REFRESH_TOKEN_EXPIRED,
  });

  const response = {
    code: 200,
    status: "success",
    data: {
      token,
      refreshToken,
    },
  };

  res.json(response);
});

// Login
router.post("/login", (_, res) => {
  const generatedOTP = generate({length: 16, numbers: true});
  const tokenPayload = {
    otp: `KUMO-${generatedOTP}`,
    email: profile.email,
  };
  const token = jwt.sign(tokenPayload, TOKEN_REGISTER_SECRET, {
    algorithm: "HS256",
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    expiresIn: "15m",
  });

  const response = {
    code: 200,
    status: "success",
    data: {
      token,
    },
  };
  res.json(response);
});

// Login Registration
router.post("/login/otp", (_, res) => {
  const tokenPayload = {
    id: profile.id,
  };

  const token = jwt.sign(tokenPayload, AUTH_TOKEN_SECRET, {
    algorithm: "HS256",
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    expiresIn: JWT_AUTH_TOKEN_EXPIRED,
  });
  const refreshToken = jwt.sign(tokenPayload, AUTH_REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    expiresIn: JWT_AUTH_REFRESH_TOKEN_EXPIRED,
  });

  const response = {
    code: 200,
    status: "success",
    data: {
      token,
      refreshToken,
    },
  };

  res.json(response);
});

// Refresh token
router.post("/refresh-token", (_, res) => {
  const tokenPayload = {
    id: profile.id,
  };

  const token = jwt.sign(tokenPayload, AUTH_TOKEN_SECRET, {
    algorithm: "HS256",
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    expiresIn: JWT_AUTH_TOKEN_EXPIRED,
  });
  const refreshToken = jwt.sign(tokenPayload, AUTH_REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    expiresIn: JWT_AUTH_REFRESH_TOKEN_EXPIRED,
  });

  const response = {
    code: 200,
    status: "success",
    data: {
      token,
      refreshToken,
    },
  };

  res.json(response);
});

export default router;
