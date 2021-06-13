<script>
    import axios from 'axios'
    import {API_QUERY_USERS, REFRESH_INTERVAL, AVATAR_IMAGE_WIDTH} from "../config/const";

    export let refresh;

    let users = [];
    let _prev = []

    const refreshData = async () => {
         await axios.get(API_QUERY_USERS)
            .then(async res => {
                const _users = res.data.items

                await axios.get(_users[0].url).then(res => {
                    _users[0].followers = res.data.followers;
                })

                await axios.get(_users[1].url).then(res => {
                    _users[1].followers = res.data.followers;
                })

                await axios.get(_users[2].url).then(res => {
                    _users[2].followers = res.data.followers;
                })

                await axios.get(_users[3].url).then(res => {
                    _users[3].followers = res.data.followers;
                })

                await axios.get(_users[4].url).then(res => {
                    _users[4].followers = res.data.followers;
                })

                users = _users
            })
            .catch(() => {
                console.log('Failed to retrieve items');
            });
    }

    /**
     * To fetch the data on component entry.
     */
    refreshData()

    let interval = null;
    const refreshStart = () => {
        if (refresh) {
            interval = setInterval(refreshData, REFRESH_INTERVAL);
        }
    }

    $: refresh ? refreshStart() : clearInterval(interval)
</script>

<table class="striped">
    <thead>
    <tr>
        <th>ID</th>
        <th>Login</th>
        <th>Avatar Image</th>
        <th>Followers</th>
    </tr>
    </thead>

    <tbody>
        {#each users as user}
            <tr>
                <td>{user.id}</td>
                <td>{user.login}</td>
                <td><img src={user.avatar_url} alt="User Avatar" width={AVATAR_IMAGE_WIDTH}/></td>
                <td>{user.followers ? user.followers.toLocaleString("en-US") : '-'}</td>
            </tr>
        {/each}
    </tbody>
</table>
