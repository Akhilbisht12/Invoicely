import { NextApiResponse } from "next";

const ErrorHandler = async (error: Error, res: NextApiResponse) => {
  return res.status(400).json({ message: error.message });
};

export default ErrorHandler;
