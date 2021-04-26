import React from 'react';
function PaypalButton (props){
  const paypalRef = React.useRef();
  const handleCompletePayment = (orderId) => {
    props.handleCompletePayment(orderId)
  }
  let price = props.price;
  let currency = props.currency;
  let transactionId = props.transactionId;
	let btn;
// options
  const btnOptions = {

    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: price,
            currency_code: currency,
          },
          custom_id: transactionId
        }]
      });
    },

    // Finalize the transaction
    onApprove: function(data, actions) {
      props.setLoadingState(true);
      return actions.order.capture().then(function(details) {
        // Show a success message to the buyer
        handleCompletePayment(details.id);
      });
    }
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

// effect, make sure to listen to Paypal library load
  React.useEffect(() => {
    (async () => {
      await sleep(1000)  // sleep second before rendering. <---------------------- solution here;
      if (paypalRef.current) {
        btn = window.paypal.Buttons(btnOptions);
        btn.render(paypalRef.current);
      }
    })();
  }, [window.paypal]);


  return <div ref={paypalRef}></div>;
}
export default PaypalButton;
