import app from "./app";
import { PORT } from './util/secrets';
const port = PORT || 3000;


app.listen(port, function () {
    global.log('Express server listening on port ' + port);
});