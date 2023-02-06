export class TextField {

  withChangeEventListener(callback) {
    if (callback !== undefined) document.body.querySelectorAll(this.inputSelector).forEach(input => input.addEventListener("change", (event) => callback(event)))
    return this
  }

  withType(callback) {
    if (callback !== undefined) document.querySelectorAll(this.inputSelector).forEach(input => {
      input.fromSessionStorage = (name) => {
        const value = JSON.parse(window.sessionStorage.getItem(name))[this.className]
        if (value !== undefined) input.value = value
      }

      callback(input)
    })
    return this
  }

  #isEmpty(value) {
    return value === undefined ||
      value === "" ||
      value.replace(/\s/g, "") === "" ||
      value === null
  }

  async withStorage(name) {
    this.storageName = name
    const value = await this.withValidValue()
    if (!this.#isEmpty(value)) {
      this.storage = JSON.parse(window.sessionStorage.getItem(this.storageName)) || {}
      this.storage[this.className] = value
      window.sessionStorage.setItem(this.storageName, JSON.stringify(this.storage))
    }
    return this
  }

  #setValidStyle(input) {
    input.style.border = "2px solid #00c853"
    input.style.borderRadius = "3px"
    return input
  }

  #setNotValidStyle(input) {
    input.style.border = "2px solid #d50000"
    input.style.borderRadius = "3px"
    return input
  }

  withUrlValue() {
    const inputs = document.body.querySelectorAll(this.inputSelector)
    inputs.forEach(input => input.value = encodeURIComponent(input.value).replace(/%20/g, "-"))
    return this
  }

  #isRequired(input) {
    if (input.required === true) return true
    return false
  }

  withValidValue() {
    return new Promise((resolve, reject) => {
      document.querySelectorAll(this.inputSelector).forEach(input => {
        if (this.#isRequired(input)) {
          if (input.checkValidity()) {
            this.#setValidStyle(input)
            return resolve(input.value)
          }
          this.#setNotValidStyle(input)
          console.error(`class='${this.className}' - required valid value`)
          return
        }
        this.#setValidStyle(input)
        return resolve(input.value)
      })
    })
  }

  withInputEventListener(callback) {
    if (callback !== undefined) document.body.querySelectorAll(this.inputSelector).forEach(input => input.addEventListener("input", (event) => callback(event)))
    return this
  }

  constructor(fieldSelector) {
    this.fieldSelector = fieldSelector
    this.className = this.fieldSelector.split("'")[1]
    this.inputSelector = `input[name='${this.className}']`

    const divs = document.querySelectorAll(this.fieldSelector)
    if (divs.length > 0) {
      divs.forEach(div => {
        div.innerHTML = ""

        const input = document.createElement("input")
        input.type = "text"
        input.name = this.className
        input.id = this.className

        div.append(input)
      })
      return
    }
    console.error("FIELD_NOT_FOUND")
  }
}
