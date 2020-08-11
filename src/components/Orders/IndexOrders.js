import React, { useState, useEffect } from 'react'
// import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'

// const save = require('../../save.js')

const IndexOrders = props => {
  const [orders, setOrders] = useState(null)

  // console.log(props)
  // console.log(save)

  useEffect(() => {
    axios({
      method: 'get',
      url: apiUrl + '/orders',
      headers: {
        'Authorization': `Bearer ${props.user.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // console.log(res)
        // save.order = res.data.orders
        setOrders(res.data.orders)
        // console.log(orders, 'api')
      })
      .catch(console.error)
  }, [])

  const orderStyle = {
    padding: 75
  }
  // console.log(save)

  let jsx

  if (orders === null) {
    jsx = <p>Loading...</p>
  } else if (orders.length === 0) {
    jsx = <p>No Orders</p>
  } else {
    jsx = (
      <Container>
        {orders.map((order, index) => {
          console.log(order, 'this is order')
          return (
            <Row style={orderStyle} sm={6} key={order._id}>
              <Col sm={6} key={index}>
                <h2>
                  {order.title}
                </h2>
                <h3>
                  {order.contact}
                </h3>
                <h4>
                  Order Status: {order.orderStatus}
                </h4>
                <h4>
                  Payment Status: {order.isPaid}
                </h4>
                <h4>
                  Products: {order.product}
                </h4>
                <h4>
                  Price: ${order.price}
                </h4>
                <h4>
                  Address: {order.shippingInfo}
                </h4>
                <h4>
                  Reference Number: {order.refNum}
                </h4>
              </Col>
            </Row>
          )
        })}
      </Container>
    )
  }

  return (
    <div>
      <h1>Orders</h1>
      {jsx}
    </div>
  )
}

export default withRouter(IndexOrders)
