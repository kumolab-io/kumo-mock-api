import {Router} from "express";

import githubData from "../mock/github.json";

const router = Router();

// Get providers
router.get("/provider", (_, res) => {
  res.json({
    github: {
      token: "12345",
    },
    gitlab: null,
    bitbucket: null,
  });
});

// Check provider
router.get("/provider/check", (_, res) => {
  res.json({
    success: true,
  });
});

// Get github repos
router.get("/provider/github", (_, res) => {
  res.json({
    data: githubData,
  });
});

// Sync github repo
router.post("/provider/github", (_, res) => {
  res.json({success: true});
});

// Delete github repo
router.delete("/provider/github", (_, res) => {
  res.json({success: true});
});

// Get github branches
router.post("/provider/github/branches", (_, res) => {
  res.json({success: true, data: githubData[0].branches});
});

export default router;
