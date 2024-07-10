import { API_CONSTANT } from '@/constant/ApiConstant';
import jwt from 'jsonwebtoken';
import API from './ApiService';
import { toast } from 'react-toastify';

class Helpers {
  getEnvVariable(key: string): string {
    const value = process.env[key];
    if (!value || value.length === 0) {
      throw new Error(`The environment variable ${key} is not set.`);
    }
    return value;
  }

  async generateToken(id: string) {
    const JWT_SECRET = this.getEnvVariable('JWT_SECRET');
    return jwt.sign({ id }, JWT_SECRET);
  }
}

export default Helpers;

export const UpdateTokenApi = (count: any) => {
  console.log('🚀 ~ UpdateTokenApi ~ count:', count);
  API.post(API_CONSTANT?.UPDATE_TOKEN, { count: count })
    .then((res) => {
      if (res?.status === 200) {
        // router.push(ROUTE?.DASHBOARD);
      }
    })
    .catch((error) => {
      console.log('🚀 ~ UpdateTokenApi ~ error:', error);
    });
};
