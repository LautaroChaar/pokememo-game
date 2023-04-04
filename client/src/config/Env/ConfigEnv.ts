import ConfigType from "../../models/types/ConfigType/ConfigType";

const ConfigEnv: ConfigType= {
  API_URL: import.meta.env.VITE_APP_URL_API,
  POKE_API: import.meta.env.VITE_APP_POKE_API
}

export default ConfigEnv;