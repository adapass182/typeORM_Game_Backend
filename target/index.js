"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const controller_1 = require("./games/controller");
const db_1 = require("./db");
const port = process.env.PORT || 4025;
const app = routing_controllers_1.createKoaServer({
    controllers: [
        controller_1.default
    ]
});
db_1.default()
    .then(_ => app.listen(port, () => console.log(`Hi Adam! I'm listening on port ${port} from src/index.ts! Also, Kat smells lololol!!!`)))
    .catch(err => console.error(`Awww sheeeit! index.ts here, I caught an error on your setupDb(): ` + err));
//# sourceMappingURL=index.js.map