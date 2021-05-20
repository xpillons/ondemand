/**
 * Open OnDemand Poller Widget
 */

import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [
    'output'
  ]

  static values = {
    interval: Number,
    url: String
  }

  initialize() {

  }

  connect() {

  }

  disconnect() {

  }
}
