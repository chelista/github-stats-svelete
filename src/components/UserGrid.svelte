<script>
    import axios from 'axios'
    import {API_QUERY_USERS, AVATAR_IMAGE_WIDTH} from "../config/const";

    let users = axios.get(API_QUERY_USERS)
        .then(res => res.data.items);
</script>

<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Login</th>
        <th>Avatar Image</th>
        <th>Followers</th>
    </tr>
    </thead>

    <tbody>
        {#await users}
            <p>Loading...</p>
        {:then users}
            {#each users as user}
                <tr>
                    <td>{user.id}</td>
                    <td>{user.login}</td>
                    <td><img src={user.avatar_url} alt="User Avatar" width={AVATAR_IMAGE_WIDTH}/></td>
                    <td>N/A</td>
                </tr>
            {/each}
        {/await}
    </tbody>
</table>
