const express = require('express')
const bodyParser = require('body-parser')
const employeeRoutes = require('./src/routes/employee.routes')

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger.json');

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req,res) =>{
    res.send("Hello World")
})

app.use('/api/v1/employees', employeeRoutes)
app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`)
})
