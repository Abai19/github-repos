import { changeDate } from "../../helpers/helper";
import { Repo } from "../../types";
import styles from './RepoCard.module.scss'
export default function RepoCard(repo: Repo) {
    return (
        <div className={styles.block}>
            <div className={styles.nameBlock}>
                <div>{repo.name}</div>
                <div>{changeDate(repo.created_at)}</div>
            </div>
            <div className={styles.secondContentBlock}>
                <div><p> Язык</p>{repo.language}</div>
                <div><p>Видимость</p>{repo.visibility}</div>
                <div><p> Количество звёзд</p> {repo.stargazers_count} </div>
                <div><p> Количество форков</p>{repo.forks_count} </div>
                <div>
                    <p>Приватность</p>
                    <div className={repo.private ? styles.green : styles.red}></div>
                </div>
                <div>
                    <p>Форк</p>
                    <div className={repo.fork ? styles.green : styles.red}></div>
                </div>

            </div>
            <a target="_blank" href={repo.html_url}>Ссылка</a>
        </div>
    )
}