import React, { useEffect, useState } from 'react'
import {
  validateInputNameAndLastNameValue,
  validateInputEmailValue,
  validateInputTelValue,
  validateInputMessageValue
} from '../../utils/helpers'
import InputMask from 'react-input-mask'

const Form = () => {
  const [data, setData] = React.useState<object>({})
  const [inputFullNameValue, setInputFullNameValue] = useState<string>('')
  const [inputEmailValue, setInputEmailValue] = useState<string>('')
  const [inputTelValue, setInputTelValue] = useState<string>('')
  const [inputDateValue, setInputDateValue] = useState<string>('')
  const [inputMessageValue, setInputMessageValue] = useState<string>('')
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true)
  const [isFormReset, setIsFormReset] = useState<boolean>(false)
 
  const className = 'form'

  const inputNameClassName = inputFullNameValue.length
    ? `${className}__input ${validateInputNameAndLastNameValue(inputFullNameValue)
      ? 'success'
      : 'error'
    }`
    : `${className}__input`
  
  const inputEmailClassName = inputEmailValue.length
    ? `${className}__input ${validateInputEmailValue(inputEmailValue)
      ? 'success'
      : 'error'
    }`
    : `${className}__input`
  
  const inputTelClassName = inputTelValue.length
    ? `${className}__input ${validateInputTelValue(inputTelValue)
      ? 'success'
      : 'error'
    }`
    : `${className}__input`
  
  const inputDateClassName = inputDateValue
    ? `${className}__input success`
    : `${className}__input`
  
  const inputMessageClassName = inputMessageValue.length
    ? `${className}__input ${validateInputMessageValue(inputMessageValue)
      ? 'success'
      : 'error' 
    }`
    : `${className}__input`
  
  useEffect(() => {
    if (validateInputNameAndLastNameValue(inputFullNameValue)
      && validateInputEmailValue(inputEmailValue)
      && validateInputTelValue(inputTelValue)
      && validateInputMessageValue(inputMessageValue)
      && inputDateValue
    ) {
      setIsSubmitDisabled(false)
    } else {
      setIsSubmitDisabled(true)
    }
  }, [
    inputFullNameValue,
    inputEmailValue,
    inputTelValue,
    inputMessageValue,
    inputDateValue
  ])

  useEffect(() => {
    if (isFormReset) {
      setInputFullNameValue('')
      setInputEmailValue('')
      setInputTelValue('')
      setInputDateValue('')
      setInputMessageValue('')
    }
  }, [isFormReset])

  useEffect(() => {
    if (Object.keys(data).length) {
      const statusMessage = document.querySelector('.message')
      let xhr = new XMLHttpRequest()

      xhr.open('POST', 'https://form-test-6c58a-default-rtdb.firebaseio.com/.json', true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.responseType = 'json'
      xhr.send(JSON.stringify(data))

      xhr.onreadystatechange = () => {
        if (xhr.readyState < 4) {
          setIsSubmitDisabled(true)
        }
        else if (xhr.readyState === 4) {
          if (xhr.status === 200 && xhr.status < 300) {
            setIsSubmitDisabled(false)
            setIsFormReset(true)
            statusMessage!.textContent = 'Форма отправлена успешно'
          }
          else {
            statusMessage!.textContent = 'Ошибка отправки формы'
          }
        }
      }

      setTimeout(() => {
        statusMessage!.textContent = ''
      }, 5000)
    }
  }, [data])
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = {
      type: 'data',
      fullname: inputFullNameValue,
      email: inputEmailValue,
      tel: inputTelValue,
      date: inputDateValue,
      message : inputMessageValue
    }

    setData(data)
  }

  return (
    <form
      className={className}
      onSubmit={handleFormSubmit}
      noValidate
    >
      <h1 className={`${className}__title`}>Form</h1>

      <div className={`${className}__item`}>
        <h2>Имя Фамилия</h2>
        <input
          className={inputNameClassName}
          id='name'
          type='text'
          onChange={(event) => setInputFullNameValue(event.target.value)}
          value={inputFullNameValue}
        />
        <div className={`${className}__fullNameWarning ${className}__warning`}></div>
      </div>

      
      <div className={`${className}__item`}>
        <h2>E-mail</h2>
        <input
          className={inputEmailClassName}
          type='email'
          onChange={(event) => setInputEmailValue(event.target.value)}
          value={inputEmailValue}
        />
        <div className={`${className}__emailWarning ${className}__warning`}></div>
      </div>

      <div className={`${className}__item`}>
        <h2>Номер телефона</h2>
        <InputMask
          className={inputTelClassName}
          type='tel'
          mask='+7 (999) 999-99-99'
          onChange={(event) => setInputTelValue(event.target.value)}
          value={inputTelValue}
          alwaysShowMask={true}
        />
        <div className={`${className}__telWarning ${className}__warning`}> </div>
      </div>

      <div className={`${className}__item`}>
        <h2>Дата рождения</h2>
        <input
          className={inputDateClassName}
          type='date'
          min='1950-01-01'
          max='2020-01-01'
          onChange={(event) => setInputDateValue(event.target.value)}
          value={inputDateValue}
        />
      </div>
      
      <div className={`${className}__item`}>
        <h2>Сообщение</h2>
        <input
          className={inputMessageClassName}
          onChange={(event) => setInputMessageValue(event.target.value)}
          value={inputMessageValue}
        />
        <div className={`${className}__messageWarning ${className}__warning`} ></div>
      </div>
      
      <button
        className={`${className}__submit`}
        disabled={isSubmitDisabled ? true : false}
      >
        Submit
      </button>
    </form>
  )
}

export default Form