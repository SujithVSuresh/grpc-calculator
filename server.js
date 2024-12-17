const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Loading and parsing protobuf file
const PROTO_PATH = path.join(__dirname, 'calculator.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).CalculatorService;

// Service methods
const calculatorService = {
    Add: (call, callback) => {
        const { number1, number2 } = call.request;
        callback(null, { result: number1 + number2 })
    },
    Subtract: (call, callback) => {
        const { number1, number2 } = call.request;
        callback(null, { result: number1 - number2 })
    },
    Multiply: (call, callback) => {
        const { number1, number2 } = call.request;
        callback(null, { result: number1 * number2 })
    },
    Divide: (call, callback) => {
        const { number1, number2 } = call.request;
        if(number2 == 0){
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: 'Division by zero is not allowed.'
            })
        }
        callback(null, { result: number1 / number2 })
    }
}


//Start the gRPC server
const server = new grpc.Server()
server.addService(calculatorProto.service, calculatorService);

const PORT = '50051'
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`gRPC server running at http://localhost:${PORT}`)
    // server.start()
})
