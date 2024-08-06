// server/utils/generateToken.js

import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign(
    { id },
    "4c4fdcd0692152f7b24284485f78fa92eddeed6a71d65a58cc63d25f8205d024",
    {
      expiresIn: "30d",
    }
  );
};

export default generateToken;
