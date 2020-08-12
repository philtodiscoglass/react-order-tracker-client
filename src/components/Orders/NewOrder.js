import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// class NewOrder extends Component {
//   constructor () {
//     super()
//
//     this.state = {
//       title: '',
//       orderStatus: '',
//       isPaid: '',
//       product: '',
//       price: '',
//       contact: '',
//       shippingInfo: '',
//       refNum: ''
//     }
//   }
//
//   handleChange = event => this.setState({
//     [event.target.name]: event.target.value
//   })
//
//   onNewOrder = event => {
//     event.preventDefault()
//
//     const { msgAlert, history, setUser } = this.props
//
//     newOrder(this.state)
//       .then(() => signIn(this.state))
//       .then(res => setUser(res.data.user))
//       .then(() => msgAlert({
//         heading: 'New Order Success',
//         message: messages.newOrderSuccess,
//         variant: 'success'
//       }))
//       .then(() => history.push('/'))
//       .catch(error => {
//         this.setState({ title: '',
//           orderStatus: '',
//           isPaid: '',
//           product: '',
//           price: '',
//           contact: '',
//           shippingInfo: '',
//           refNum: '' })
//         msgAlert({
//           heading: 'New Order Failed ' + error.message,
//           message: messages.newOrderFailure,
//           variant: 'danger'
//         })
//       })
//   }

  const NewOrder = (props) => {
  const [order, newOrder] = useState({ title: '',
    orderStatus: '',
    isPaid: '',
    product: '',
    price: '',
    contact: '',
    shippingInfo: '',
    refNum: '' })
  const { msgAlert } = props

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const createdExpense = Object.assign({}, order, updatedField)

    newOrder(newOrder)
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/orders`,
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: {
        orders: {
          title: order.title,
          orderStatus: order.orderStatus,
          isPaid: order.isPaid,
          product: order.product,
          price: order.price,
          contact: order.contact,
          shippingInfo: order.shippingInfo,
          refNum: order.refNum
        }
      }
    })
      .then(() => msgAlert({
        heading: 'Success',
        message: messages.newOrderSuccess,
        variant: 'success'
      }))
      .then(() => props.handleClose())
      .then(() => newOrder({ title: '',
        orderStatus: '',
        isPaid: '',
        product: '',
        price: '',
        contact: '',
        shippingInfo: '',
        refNum: '' }))
      .catch(() => msgAlert({
        heading: 'Failure',
        message: messages.newOrderFailure,
        variant: 'danger'
      }))
  }

  render () {
    const { title, orderStatus, isPaid, product, price, contact, shippingInfo, refNum } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>New Order</h3>
          <Form onSubmit={this.onNewOrder}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={title}
                placeholder="Order Title"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="orderStatus">
              <Form.Label>Order Status</Form.Label>
              <Form.Control as="select"
                required
                type="text"
                name="orderStatus"
                value={orderStatus}
                placeholder="Order Status"
                onChange={this.handleChange}
              >
                <option>Order Status</option>
                <option>Incomplete</option>
                <option>WIP</option>
                <option>Ready To Ship</option>
                <option>Complete</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="isPaid">
              <Form.Label>Payment Status</Form.Label>
              <Form.Control as="select"
                required
                type="text"
                name="isPaid"
                value={isPaid}
                placeholder="Payment Status"
                onChange={this.handleChange}
              >
                <option>Payment Status</option>
                <option>Paid In Full</option>
                <option>Incomplete</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="product">
              <Form.Label>Product</Form.Label>
              <Form.Control
                required
                type="text"
                name="product"
                value={product}
                placeholder="Products"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                name="price"
                value={price}
                placeholder="Price (numbers only)"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="contact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                required
                type="text"
                name="contact"
                value={contact}
                placeholder="Contact"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="shippingInfo">
              <Form.Label>Shipping Info</Form.Label>
              <Form.Control
                required
                type="text"
                name="shippingInfo"
                value={shippingInfo}
                placeholder="Street, City, State, Zip"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="refNum">
              <Form.Label>Reference Number</Form.Label>
              <Form.Control
                required
                type="text"
                name="refNum"
                value={refNum}
                placeholder="Reference Number"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(NewOrder)

// <Form.Group controlId="order-status">
//   <Form.Label>Order Status</Form.Label>
//   <Form.Control
//     required
//     name="orderStatus"
//     value={orderStatus}
//     type="text"
//     placeholder="Order Status"
//     onChange={this.handleChange}
//   />
// </Form.Group>
