<script>
    import axios from 'axios'
    import {API_QUERY_REPOS, REFRESH_INTERVAL, NUM_ITEMS} from "../config/const";
    import {storeData, loadData, canLoadData} from '../helpers/data';
    import TableContainer from '../components/TableContainer.svelte';

    /**
     * Expose variable to receive signal from the switch widget.
     */
    export let refresh;

    let repos = [];

    /**
     * To conditionally refresh the repository data.
     */
    const refreshData = () => {

        if (canLoadData('repos')) {
            axios.get(API_QUERY_REPOS)
                .then(res => {
                    repos = res.data.items
                    storeData('repos', repos);
                })
                .catch(() => {
                    console.log('Unable to fetch repository data');

                    let _repos = loadData('repos', NUM_ITEMS);
                    if (_repos) {
                        console.log('Using repos from local storage');
                        repos = _repos
                    }
                });
        } else {
            // Attempt to retrieve the the last successful request
            let _repos = loadData('repos', NUM_ITEMS);
            if (_repos) {
                console.log('Using repos from local storage');
                repos = _repos
            }
        }
    }

    let interval = null;
    const refreshStart = () => {
        if (refresh) {
            interval = setInterval(refreshData, REFRESH_INTERVAL);
        }
    }

    /**
     * To fetch the data on component entry.
     */
    refreshData()

    $: refresh ? refreshStart() : clearInterval(interval)
</script>

<TableContainer>
    <table class="striped">s
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stars</th>
            <th>Description</th>
        </tr>
        </thead>

        <tbody>
            {#await repos}
                <p>Loading...</p>
            {:then repos}
                {#each repos as repo}
                    <tr>
                        <td>{repo.id}</td>
                        <td><a href={repo.html_url} target={repo.name}>{repo.name}</a></td>
                        <td>{repo.watchers_count.toLocaleString("en-US")}</td>
                        <td>{repo.description || 'No Description'}</td>
                    </tr>
                {/each}
            {/await}
        </tbody>
    </table>
</TableContainer>
