import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";

const TransactionPopUp = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [buyPrice, setBuyPrice] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [sellQuantity, setSellQuantity] = useState(0);
  
  const { transactions } = props;

  // NEED this id in order to insert the transaction into the database
  let portfolio_coins_id = props.portfolioCoinId;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    // close the pop up once cancel button or submit button is is pressed
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBuyPriceChange = (event) => {
    setBuyPrice(event.target.value);
  };

  const handleBuyQuantityChange = (event) => {
    setBuyQuantity(event.target.value);
  };

  const handleSellPriceChange = (event) => {
    setSellPrice(event.target.value);
  };

  const handleSellQuantityChange = (event) => {
    setSellQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post("/api/coin/transaction", {
        portfolio_coins_id: portfolio_coins_id,
        type: data.get('type'),
        price_per_coin: data.get('price_per_coin'),
        quantity: data.get('quantity'),
        total_spent: data.get('total_spent'),
        date: data.get('date'),
        fee: data.get('fee'),
        note: data.get('note')
      })
      .then((res) => {
        console.log(res);
        props.setAddedTransaction(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Transaction
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Add Transaction</DialogTitle>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="BUY" value="1" />
              <Tab label="SELL" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <DialogContent>
                <TextField
                  required
                  readOnly="readonly"
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="type"
                  name="type"
                  label="Transaction Type"
                  type="text"
                  fullWidth
                  value="Buy"
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="price_per_coin"
                  name="price_per_coin"
                  label="Price Per Coin ($)"
                  type="number"
                  fullWidth
                  onChange={handleBuyPriceChange}
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  onChange={handleBuyQuantityChange}
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  readOnly="readonly"
                  autoFocus
                  margin="dense"
                  id="total_spent"
                  name="total_spent"
                  label="Total Spent ($)"
                  type="number"
                  fullWidth
                  value={buyPrice * buyQuantity}
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="date"
                  name="date"
                  label="Date"
                  type="datetime-local"
                  fullWidth
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="fee"
                  name="fee"
                  label="Fee"
                  type="number"
                  fullWidth
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="note"
                  name="note"
                  label="Note"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" onClick={handleCancel}>
                  Submit
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </DialogActions>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <DialogContent>
                <TextField
                  required
                  readOnly="readonly"
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="type"
                  name="type"
                  label="Transaction Type"
                  type="text"
                  fullWidth
                  value="Sell"
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="price_per_coin"
                  name="price_per_coin"
                  label="Price Per Coin ($)"
                  type="number"
                  fullWidth
                  onChange={handleSellPriceChange}
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  onChange={handleSellQuantityChange}
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  readOnly="readonly"
                  autoFocus
                  margin="dense"
                  id="total_spent"
                  name="total_spent"
                  label="Total Received ($)"
                  type="number"
                  fullWidth
                  value={sellPrice * sellQuantity}
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="date"
                  name="date"
                  label="Date"
                  type="datetime-local"
                  fullWidth
                />
                <TextField
                  required
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="fee"
                  name="fee"
                  label="Fee"
                  type="number"
                  fullWidth
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoFocus
                  margin="dense"
                  id="note"
                  name="note"
                  label="Note"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" onClick={handleCancel}>
                  Submit
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </DialogActions>
            </Box>
          </TabPanel>
        </TabContext>
      </Dialog>
    </div>
  );
};

export default TransactionPopUp;