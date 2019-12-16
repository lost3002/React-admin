import React from 'react'
import {connect} from 'react-redux'

import Counter from '../components/Counter'
import {increment, decrement} from '../redux/actions'

function mapStateToProps (state) {
  return {
    count: state
  }
}

function mapDisptchToprops (dispatch) {
  return {
    increment: number => dispatch(increment(number)),
    decrement: number => dispatch(decrement(number))
  }
}

export default connect(
  mapStateToProps,
  mapDisptchToprops
)(Counter)