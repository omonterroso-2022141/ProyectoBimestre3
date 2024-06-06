import { initServer } from "./config/app.js";
import { connect } from "./config/mongo.js";
import { initAdmin } from './src/admin/admin.controller.js'

initAdmin()
initServer()
connect()