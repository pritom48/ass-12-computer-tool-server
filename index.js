const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nzpi0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const toolCollection = client.db('computer-tools').collection('tools')
        const reviewCollection = client.db('computer-tools').collection('reviews')
        const orderCollection = client.db('computer-tools').collection('orders')

        app.get('/tool', async (req, res) => {
            const query = {};
            const cursor = toolCollection.find(query);
            const tools = await cursor.toArray();
            res.send(tools)
        })

        app.get('/tool/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const tool = await toolCollection.findOne(query)
            res.send(tool)
        })

        app.get('/review', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews)
        })

        app.get('/order', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await orderCollection.find(query).toArray();
            res.send(result)
        })

        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result)
        })

    }
    finally {

    }

}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("computer running")
})

app.listen(port, () => {
    console.log('ami doracci')
})