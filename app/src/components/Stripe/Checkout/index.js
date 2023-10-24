import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {Col, Row, Button, Form} from 'react-bootstrap'
export const StripeCheckout = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_RETURN_URL}/purchase/status?purchase_id=${props.purchase_id}`,
      },
    });

    if (result.error) {
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Form.Group className={'mt-3'}>
                        <Row>
                            <Col md={4}>
                                <Button className={'btn btn-primary'} disabled={!stripe} type={'submit'}>Submit</Button>
                            </Col>
                            <Col md={8} className={'justify-content-end d-flex align-items-end col-md-8'}>
                                <Button className={'btn btn-success'} onClick={() => props.setPage(1)} >Back</Button>
                            </Col>
                        </Row>
      </Form.Group>
    </form>
  )
};