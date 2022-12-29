import express, {Response} from "express";

const router = express.Router();

router.get("/", (_, res: Response) => {
  res.send("Server is up and running")
})

export default router;

