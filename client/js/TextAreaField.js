import { Helper } from "/js/Helper.js"

export class TextAreaField {

  withInfoClick(callback) {
    if (callback !== undefined) {
      this.icon.src = "/public/info-gray.svg"
      this.icon.alt = "Mehr Infos"
      this.icon.style.display = "block"
      this.labelContainer.style.cursor = "pointer"
      this.labelContainer.childNodes.forEach(child => child.style.cursor = "pointer")
      this.labelContainer.addEventListener("click", callback)
    }
    return this
  }

  value(callback) {
    if (callback !== undefined) {
      if (!Helper.stringIsEmpty(callback(this.name))) this.input.value = callback(this.name)
    }
    return this
  }

  #isRequired(input) {
    if (input.required === true) return true
    return false
  }

  #checkValidity(input) {
    if (input.checkValidity() === false) return false
    return true
  }

  verifyValue() {
    if (this.#isRequired(this.input)) {
      if (this.#checkValidity(this.input)) {
        Helper.setValidStyle(this.input)
        return true
      }
      Helper.setNotValidStyle(this.input)
      return false
    }
    Helper.setValidStyle(this.input)
    return true
  }

  validValue() {
    if (this.#isRequired(this.input)) {
      if (this.#checkValidity(this.input)) {
        Helper.setValidStyle(this.input)
        return this.input.value
      }
      Helper.setNotValidStyle(this.input)
      const error = new Error(`field required: '${this.name}'`)
      error.fieldName = this.name
      throw new Error(error)
    }
    Helper.setValidStyle(this.input)
    return this.input.value
  }

  #setTextArea(field) {
    field.innerHTML = ""
    // field.id = this.name
    field.classList.add("field")

    field.style.position = "relative"
    field.style.borderRadius = "13px"
    field.style.border = "0.3px solid black"
    field.style.display = "flex"
    field.style.flexDirection = "column"
    field.style.margin = "34px"
    field.style.justifyContent = "center"

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      field.style.backgroundColor = Helper.colors.dark.foreground
      field.style.border = Helper.colors.dark.border
      field.style.boxShadow = Helper.colors.dark.boxShadow
      field.style.color = Helper.colors.dark.text
    } else {
      field.style.backgroundColor = Helper.colors.light.foreground
      field.style.border = Helper.colors.light.border
      field.style.boxShadow = Helper.colors.light.boxShadow
      field.style.color = Helper.colors.light.text
    }

    const labelContainer = document.createElement("div")
    labelContainer.style.display = "flex"
    labelContainer.style.alignItems = "center"
    labelContainer.style.margin = "21px 89px 0 34px"
    this.labelContainer = labelContainer

    const icon = document.createElement("img")
    icon.style.width = "34px"
    icon.style.marginRight = "21px"
    icon.style.display = "none"
    this.icon = icon
    labelContainer.append(icon)

    const label = document.createElement("label")
    // label.classList.add(this.name)



    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      label.style.color = Helper.colors.dark.text
    } else {
      label.style.color = Helper.colors.light.text
    }


    label.style.fontSize = "21px"
    labelContainer.append(label)
    this.label = label
    field.append(labelContainer)

    const input = document.createElement("textarea")
    // input.classList.add(this.name)

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      input.style.backgroundColor = Helper.colors.dark.background
      input.style.color = Helper.colors.dark.text
    } else {
      input.style.backgroundColor = Helper.colors.light.background
      input.style.color = Helper.colors.light.text
    }

    input.style.margin = "21px 89px 21px 34px"
    input.style.fontSize = "21px"
    this.input = input
    field.append(input)
    return field
  }

  constructor(name, parent) {
    if (Helper.stringIsEmpty(name)) throw new Error("name is empty")
    this.name = name
    this.type = "textarea"
    this.field = document.createElement("div")
    this.field = this.#setTextArea(this.field)
    if (parent !== undefined) {
      this.parent = parent
      parent.append(this.field)
    }
  }
}
