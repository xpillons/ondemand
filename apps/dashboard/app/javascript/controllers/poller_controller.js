/**
 * Open OnDemand Poller Widget
 */
import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['body']

  static values = {
    url: String,
    interval: Number,
    loading: Boolean,
    error: Boolean,
  }

  // Fetch request options:
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters
  static requestConfig = {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      Accept: 'text/*, application/json',
    },
    redirect: 'follow',
  }

  toggleLoading() {
    let tmp = this.loadingValue
    this.loadingValue = !this.loadingValue

    console.debug('loading from ' + tmp + ' to ' + this.loadingValue)
  }

  fetchRemote() {
    this.toggleLoading()

    return fetch(this.urlValue, this.requestConfig)
      .then(response => this.parseResponse(response))
      .then(data => this.updateBody(data))
      .finally(this.toggleLoading())
  }

  parseResponse(response) {
    return new Promise((resolve, reject) => {
      Promise.resolve(response)
        .then(response =>
          response.ok
            ? Promise.resolve(response)
            : Promise.reject(new Error(response.statusText)),
        )
        .then(response => response.text())
        .then(data => resolve(data))
        .catch(e => reject(e))
    })
  }

  updateBody(body) {
    this.bodyTarget.innerHTML = body
  }

  /**
   * Native Stimulus.js hooks
   */
  initialize() {
    this.fetchRemote()
  }

  connect() {
    this.timer = setInterval(() => {
      // Start polling
      this.fetchRemote()
    }, this.intervalValue)
  }
}
