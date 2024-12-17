const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'calculator.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const CalculatorService = grpc.loadPackageDefinition(packageDefinition).CalculatorService;


const client = new CalculatorService('localhost:50051', grpc.credentials.createInsecure())

client.Add({number1: 10, number2: 5}, (error, response) => {
    if (error) return console.error(error)
    console.log('Add Result:', response.result) 
})

client.Subtract({number1: 10, number2: 5}, (error, response) => {
    if (error) return console.error(error)
    console.log('Subtract Result:', response.result) 
})

client.Multiply({ number1: 10, number2: 5 }, (error, response) => {
    if (error) return console.error(error);
    console.log('Multiply Result:', response.result);
});

client.Divide({ number1: 10, number2: 0 }, (error, response) => {
    if(error){
        console.error('Divide Error', error.message)
    }else{
        console.log('Divide Result: ', response.result)
    }
})