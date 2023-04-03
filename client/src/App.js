import axios from 'axios'
import {useState} from 'react'
import './App.css';

function App() {

  const [book,setBook] = useState({
    name:"Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    img: "https://m.media-amazon.com/images/I/410hiaPGyCL._SX348_BO1,204,203,200_.jpg",
    price: 3000,
  })

  const initPayment = (data) => {
    const options = {
      key: process.env.KEY_ID,
      amount: data.amount,
      name: data.name,
      currency: data.currency,
      description: "Test Transaction",
      image: data.img,
      order_id: data.id,
      handler: async(response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify"
          const {data} = await axios.post(verifyUrl, response)
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      }
    }

    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/payment/orders"
      const {data} = await axios.post(orderUrl, {amount: book.price})
      console.log(data);

      initPayment(data.data)

    } catch (error) {
      console.log(error);
    }
  }

  return (
		<div className="App">
			<div className="book_container">
				<img src={book.img} alt="book_img" className="book_img" />
				<p className="book_name">{book.name}</p>
				<p className="book_author">By {book.author}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {book.price}</span>
				</p>
				<button onClick={handlePayment} className="buy_btn">
					buy now
				</button>
			</div>
		</div>
	);
}

export default App;
