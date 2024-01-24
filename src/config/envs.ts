import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB: get('MONGO_DB').required().asString(),
  
  JWT_SEED: get('JWT_SEED').required().asString(),
  
  MAILER_SERVICE:get('MAILER_SERVICE').required().asString(),
  EMAIL:get('EMAIL').required().asString(),
  EMAIL_KEY:get('EMAIL_KEY').required().asString(),
  SEND_EMAIL:get('SEND_EMAIL').default('false').asBool(),

  WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString()
}



