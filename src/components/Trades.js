import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './App.css';

class Trades extends Component {

  convertToNiceTime (unix_timestamp) {
    const date = new Date(unix_timestamp*1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return ('0' + hours).slice(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  renderTrade (value) {
    if (value[1].amount > 0) {
      return (
        <div key={this.convertToNiceTime(value[0])} className="OrderBook-green">
          <span>{this.convertToNiceTime(value[0])}</span>
          <span>{value[1].amount.toFixed(8)}</span>
          <span>{value[1].price.toFixed(2)}</span>
        </div>
      )
    }
    return (
      <div key={value[0]} className="OrderBook-red">
        <span>{this.convertToNiceTime(value[0])}</span>
        <span>{(value[1].amount * -1).toFixed(8)}</span>
        <span>{value[1].price.toFixed(2)}</span>
      </div>
    )
  }

  renderTrades () {
    return this.props.trades.trades.entrySeq().map(this.renderTrade.bind(this))
  }

  render() {
    return (
      <div className="OrderBook-main">
        <h3>Trades</h3>
        <div className="OrderBook">
          <div className="OrderBook-panel">
            {this.renderTrades()}
          </div>
        </div>
      </div>
    );
  }
}

Trades.propTypes = {
  trades: PropTypes.object.isRequired
}

export default Trades;