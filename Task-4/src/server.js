import app from './app.js';
import { initDataSource } from './data-source.js';

const PORT = process.env.PORT || 3000;

initDataSource()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("DataSource init error", err);
        process.exit(1);
    });
