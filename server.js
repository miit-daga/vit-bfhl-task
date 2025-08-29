const app = require('./api/index.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`BFHL API Server is running on port ${PORT}`);
    console.log(`Test endpoint: http://localhost:${PORT}/bfhl`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});