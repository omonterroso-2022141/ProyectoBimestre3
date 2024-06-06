import { initServer } from "./config/app.js";
import { connect } from "./config/mongo.js";
import { initAdmin } from './src/user/user.controller.js'

initAdmin()
initServer()
connect()