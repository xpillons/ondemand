/**
 * Open OnDemand Poller Widget
 */

import { Controller } from 'stimulus'

import axios from 'axios'

export default class extends Controller {
  static targets = [
    'output'
  ]

  static values = {
    interval: Number,
    url: String
  }

  http = axios.create({
    headers: {
      'Content-Type': 'text/html'
    }
  })

  async fetchRemote() {
    const { data } = await axios.get(this.urlValue)

    if (!data) {
      console.log('ERROR')
    }

    return data
  }

  updateWidgetDOM(data) {
    if (typeof data == 'string') {
      this.outputTarget.innerHTML = data
    } else {
      if (typeof data == Object) {
        console.info('OBJ')
      }
      this.outputTarget.innerHTML = 'Failed to update DOM'
    }
  }

  initialize() {
    // Setup request
    this.fetchRemote()
      .then(data => {
        this.updateWidgetDOM(data)
      })
  }

  connect() {

  }

  disconnect() {

  }
}
