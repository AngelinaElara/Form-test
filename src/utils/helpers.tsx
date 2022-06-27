export const validateInputNameAndLastNameValue = (value: string) => { 
  const re = /[A-Za-z]{3,30}/
  
  const val = value.trim()
  if (val === '') {
    return false
  }
  const arr = value.split(' ')
  if (arr.length !== 2)  {
    const div = document.querySelector('.form__fullNameWarning')
    div!.textContent = 'Это поле должно состоять из двух слов латинского алфавита'
    return false
  }
  
  const [firstName, lastName] = arr
  if (re.test(firstName) && re.test(lastName)) {
    const div = document.querySelector('.form__fullNameWarning')
    div!.textContent = ''
    return true
  }
}

export const validateInputEmailValue = (value: string) => {
  if (!value.length) return false
  
  if (value.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) !== -1) {
    const div = document.querySelector('.form__emailWarning')
    div!.textContent = ''
    return true
  } else {
    const div = document.querySelector('.form__emailWarning')
    div!.textContent = 'Введите корректный E-mail'
    return false
  }
}

export const validateInputTelValue = (value: string) => {
  if (value.search(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g) !== -1) {
    const div = document.querySelector('.form__telWarning')
    div!.textContent = ''
    return true
  } else {
    const div = document.querySelector('.form__telWarning')
    div!.textContent = 'Введите корректный номер телефона'
    return false
  }
}

export const validateInputMessageValue = (value: string) => {
  if (value.search(/^.{10,300}$/) !== -1) {
    const div = document.querySelector('.form__messageWarning')
    div!.textContent = ''
    return true
  } else if (value.length < 10) {
    const div = document.querySelector('.form__messageWarning')
    div!.textContent = 'Минимальное количество символов 10'
    return false
  } else if (value.length > 300) {
    const div = document.querySelector('.form__messageWarning')
    div!.textContent = 'Максимальное количество символов 300'
  }
}