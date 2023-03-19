import RepoCard from '@components/RepoCard/RepoCard'
import { useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useAppDispatch } from '../../hooks/hooks'
import { filterDate } from '../../redux/reposSlice'
import { Repo } from '../../types'
import styles from './ReposList.module.scss'
interface IProps {
    repos: Repo[]
}
export default function Repos({ repos }: IProps) {
    const dispatch = useAppDispatch()
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')
    function makeFilter() {
        if (sortType == 'asc') {
            setSortType('desc')
            dispatch(filterDate('asc'))
        }
        else {
            setSortType('asc')
            dispatch(filterDate('desc'))
        }
    }
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 10;
    const filteredAndSortedRepos = useMemo(() => {
        return repos.slice(itemOffset, endOffset);
    }, [repos, sortType, itemOffset])

    const pageCount = Math.ceil(repos.length / 10);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * 10) % repos.length;
        setItemOffset(newOffset);
    };
    if (!repos) {
        return <div>Loading...</div>
    }


    return (
        <div className={styles.con}>
            <div onClick={makeFilter} className={styles.fl}>
                {sortType == 'asc' ?
                    <div>сначала старые&darr;</div>
                    :
                    <div>сначала новые&uarr;</div>
                }
            </div>
            {filteredAndSortedRepos.map((repo) => (
                <RepoCard key={repo.id} {...repo} />
            ))}

            <ReactPaginate
                breakLabel="..."
                nextLabel="след >"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< назад"
                renderOnZeroPageCount={undefined}

            />
        </div>
    )
}