import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import Controller from './controller'

const port = process.env.PORT || 4025

const app = createKoaServer({
    controllers: [
        Controller
    ]
})

app.listen(port, () => console.log(`Hi Adam! I'm listening on port ${port} from src/index.ts!`))