import jwt from "jsonwebtoken";

class Helpers {
  getEnvVariable(key: string): string {
    const value = process.env[key];
    if (!value || value.length === 0) {
      throw new Error(`The environment variable ${key} is not set.`);
    }
    return value;
  }

  async generateToken(id: string) {
    console.log("id------>", id);

    const JWT_SECRET = this.getEnvVariable("JWT_SECRET");
    return jwt.sign({ id }, JWT_SECRET);
  }
}

export default Helpers;
