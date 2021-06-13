<script>
    import axios from 'axios'
    import {API_QUERY_REPOS, REFRESH_INTERVAL} from "../config/const";

    export let refresh;

    let lastResults;
    let repos = [];

    const refreshData = () => {
        axios.get(API_QUERY_REPOS)
            .then(res => repos = res.data.items)
            .catch(() => {
                console.log('Unable to fetch repository data');
            });
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

<table class="striped">
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
                    <td>{repo.name}</td>
                    <td>{repo.watchers_count.toLocaleString("en-US")}</td>
                    <td>{repo.description || 'No Description'}</td>
                </tr>
            {/each}
        {/await}
    </tbody>
</table>
