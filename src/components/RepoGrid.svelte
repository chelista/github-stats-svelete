<script>
    import axios from 'axios'
    import {API_QUERY_REPOS} from "../config/const";

    let repos = axios.get(API_QUERY_REPOS)
        .then(res => res.data.items);
</script>

<table>
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
                    <td>{repo.watchers_count}</td>
                    <td>{repo.description}</td>
                </tr>
            {/each}
        {/await}
    </tbody>
</table>
