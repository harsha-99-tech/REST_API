const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample data
let Data = [
  { No: 1, name: 'data 1', index: 'ITT/2019/000', Reg_No: 0001 },
  { No: 2, name: 'data 2', index: 'ITT/2019/001', Reg_No: 0002 },
];

// Get all items
app.get('/items', (req, res) => {
  res.json(Data);
});

// Get an item by No
app.get('/items/:No', (req, res) => {
  const itemNo = parseInt(req.params.No);
  const item = Data.find(item => item.No === itemNo);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);
});

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.No = Data.length + 1; // Use No instead of id
  Data.push(newItem);
  res.status(201).json(newItem);
});

// Update an item by No
app.put('/items/:No', (req, res) => {
  const itemNo = parseInt(req.params.No);
  const updatedItem = req.body;

  const index = Data.findIndex(item => item.No === itemNo);

  if (index !== -1) {
    Data[index] = { ...Data[index], ...updatedItem };
    res.json(Data[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete an item by No
app.delete('/items/:No', (req, res) => {
  const itemNo = parseInt(req.params.No);
  Data = Data.filter(item => item.No !== itemNo);
  res.json({ message: 'Item deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});
