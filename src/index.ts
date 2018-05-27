import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import Controller from './games/controller'
import setupDb from './db'

const port = process.env.PORT || 4025

const app = createKoaServer({
    controllers: [
        Controller
    ]
})

setupDb()
    .then(_ =>
        app.listen(port, () => console.log(`Hi Adam! I'm listening on port ${port} from index.ts!`))
    )
    .catch(err => console.error(`Awww sheeeit! index.ts here, I caught an error on your setupDb(): ` + err))
