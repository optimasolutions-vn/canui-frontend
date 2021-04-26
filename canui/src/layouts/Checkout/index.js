import React from 'react';
import { connect } from 'react-redux';
import PaypalButtons from "../../components/PaypalButtons";
import paymentServices from "../../services/paymentServices"
import {convertNumberToHaveCommas} from "../../helpers/DataAccess";
import Loader from '../../components/effects/Loader';
import {Currency} from "../../helpers/DataAccess";
import {runScript} from "../../libs/templateJs";
import jobServices from '../../services/jobServices'
import {Alert} from '../Scripts/ManualScript';
const $ = window.$;
const mapStateToProps = state => ({
  user: state.user,
  siteData: state.siteData
});

const mapDispatchToProps = dispatch => ({

});
class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			price: 0,
      currency: '',
      transactionId: '',
			isLoading: true,
			vouchers: [],
      voucherId: 0,
			totalPrice: 0

		};
	}
	async componentDidMount() {
		let jobId = this.props.match.params.jobId;
		if (!jobId) {
			this.props.history.push('/404')
		}
		let responseJob = await jobServices.getJobDetail({
      jobId: jobId
		});
		if (responseJob.status) {
			this.setState({
				price: responseJob.data.total,
        totalPrice: responseJob.data.total
			})
		} else {
      this.props.history.push('/404')
		}
		let response = await paymentServices.getCoupon({
			userId: this.props.user.profile.id
		});
		let voucher = [];
		if (response.status) {
			voucher = response.data.content
		}
		this.setState({
      vouchers: voucher,
			isLoading: false
		}, () => {
      $('.selectpicker').selectpicker('val', 0);
		})
		// let transaction = await paymentServices.createTraction({
     //  jobId: jobId
		// });
		// if (transaction.status) {
		// 	if (Currency.indexOf(transaction.data.currency) === -1) {
		// 		Alert({
     //      title: this.props.t("Unsupport currency") + transaction.data.currency,
     //      time: 4000,
		// 		})
		// 	}
		// 	this.setState({
		// 		currency: transaction.data.currency,
		// 		price: transaction.data.total,
     //    transactionId: transaction.data.id,
     //    isLoading: false
		// 	});
		// } else {
		// 	this.props.history.push('/404')
		// }
	}
	setLoadingState = (status) => {
		this.setState({
			isPaymenting: status
		})
	}
  getTransactionInfo = async(e) => {
		e.preventDefault();
    let jobId = this.props.match.params.jobId;
    let agu = {
      jobId: jobId
    };
    if (this.state.voucherId) {
    	agu.couponId = this.state.voucherId
		}
		this.setState({
			isPaymenting: true,
      isShowButton: false
		})
    let transaction = await paymentServices.createTraction(agu);
    if (transaction.status) {
    	if (Currency.indexOf(transaction.data.currency) === -1) {
    		Alert({
         title: this.props.t("Unsupport currency") + transaction.data.currency,
         time: 4000,
    		})
    	}
    	this.setState({
    		currency: transaction.data.currency,
        totalPrice: transaction.data.total,
       transactionId: transaction.data.id,
        isPaymenting: false,
				isShowButton: true
    	});
    } else {
      Alert({
        title: this.props.t("Cannot Proceed Payment"),
        time: 4000,
      })
			this.setState({
        isPaymenting: false
			})
    }
	};
	handleCompletePayment = async (orderId) => {
		let response = await paymentServices.completePayment({
      paypalOrderId: orderId
		})
		if (response.status) {
			Alert({
				title: 'Payment success',
				status: 'success'
			});
			this.setState({
				isPaymenting: false
			})
			this.props.history.push('/')
		} else {
      Alert({
        title: 'Cannot Payment'
      })
		}
	};
  handleSelectVoucher = (e) => {
		this.setState({
			voucherId: e.currentTarget.value
		})
	}
	render(){
		let { t } = this.props;
		if (this.state.isLoading) {
      return <Loader/>
		}
		return(
			<div className="row" style={{margin: 0}}>
				{this.state.isPaymenting && <Loader/>}
				<div className="col-xl-8 col-lg-8 content-right-offset">

					<h3 className="margin-top-50">Coupon</h3>
					<select className={`selectpicker margin-top-20 margin-bottom-10`} data-live-search="true" onChange={this.handleSelectVoucher}>
            {
              this.state.vouchers.map((item, index) => {
                return <option key={index} value={item.code}>{item.code}</option>
              })
            }
					</select>
					<a href="" onClick={this.getTransactionInfo} className="button big ripple-effect margin-top-20 margin-bottom-30">Proceed Payment</a>
          {this.state.isShowButton && <PaypalButtons setLoadingState={this.setLoadingState} handleCompletePayment={this.handleCompletePayment} price={this.state.price} currency={this.state.currency} transactionId={this.state.transactionId} />}
				</div>

				<div className="col-xl-4 col-lg-4 margin-top-0 margin-bottom-60">
					<div className="boxed-widget summary margin-top-0">
						<div className="boxed-widget-headline">
							<h3>Summary</h3>
						</div>
						<div className="boxed-widget-inner">
							<ul>
								<li>{this.props.t('Price')} <span>{convertNumberToHaveCommas(this.state.price)} {this.state.currency}</span></li>
								<li className="total-costs">{this.props.t('Final Price')} <span>{convertNumberToHaveCommas(this.state.totalPrice)} {this.state.currency}</span></li>
							</ul>
						</div>
					</div>
				</div>

			</div>
		)
	}
};export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
