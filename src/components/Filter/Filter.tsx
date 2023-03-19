import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks'
import { filterLanguage, filterAmountStar, filterAmountForks, filterForkStatus, fetchReposRequest, resetFilter } from '../../redux/reposSlice'
import styles from './Filter.module.scss'

export function Filter() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    language: '',
    amountForks: '',
    amountStars: '',
    fork: false,
  })
  function changeUser(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(fetchReposRequest(event.target.value))
  }
  function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
    setData({ ...data, language: event.target.value })
    dispatch(filterLanguage(event.target.value))
  }
  function changeAmountStar(event: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, amountStars: event.target.value })
    dispatch(filterAmountStar(event.target.value))
  }
  function changeAmountForks(event: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, amountForks: event.target.value })
    dispatch(filterAmountForks(event.target.value))
  }
  function changeForkStatus(event: React.ChangeEvent<HTMLInputElement>) {
    setData({ ...data, fork: event.target.checked })
    dispatch(filterForkStatus(event.target.checked))
  }
  function reset() {
    setData({
      language: "",
      amountForks: "",
      amountStars: "",
      fork: false
    })
    dispatch(resetFilter())
  }

  return (
    <div className={styles.container}>
      <p> Фильтры</p>
      <input type="text" onInput={changeUser} placeholder='Введите пользователя' />
      <select value={data.language} onChange={changeLanguage}>
        <option value=""> Выберите значение</option>
        <option value="JavaScript">JavaScript</option>
        <option value="TypeScript">TypeScript</option>
        <option value="python">python</option>
        <option value="go">go</option>
      </select>
      <label htmlFor="stars">
        Количество звезд
        <input type="number" value={data.amountStars} onChange={changeAmountStar} name="stars" />
      </label>
      <label htmlFor="forks">
        Количесто форков
        <input type="number" value={data.amountForks} onChange={changeAmountForks} name="forks" />
      </label>
      <label htmlFor="forks" id="forks" >
        <input type="checkbox" name="forks" checked={data.fork} onChange={changeForkStatus} />
        Форк
      </label>
      <button onClick={reset}>Сбросить фильтры</button>
    </div>
  )
}


