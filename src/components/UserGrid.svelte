<script>
    import axios from 'axios'
    import {API_QUERY_USERS, REFRESH_INTERVAL, NUM_ITEMS} from "../config/const";
    import {canLoadData, loadData, storeData} from "../helpers/data";
    import TableContainer from '../components/TableContainer.svelte';
    import UserAvatar from '../components/UserAvatar.svelte';

    export let refresh;

    let users = [];
    let _prev = []

    const refreshData = async () => {
        if (canLoadData('users')) {
            await axios.get(API_QUERY_USERS)
                .then(async res => {
                    const _users = res.data.items

                    for (let i = 0; i < NUM_ITEMS; i++) {
                        axios.get(_users[i].url).then(res => {
                            _users[i].followers = res.data.followers;
                        })
                    }

                    users = _users
                    storeData('users', users);
                })
                .catch(() => {
                    console.log('Unable to fetch user data');

                    // Attempt to retrieve the the last successful request
                    let _users = loadData('users', NUM_ITEMS);
                    if (_users) {
                        console.log('Using users from local storage');
                        users = _users
                    }
                });
        } else {
            // Attempt to retrieve the the last successful request
            let _users = loadData('users', NUM_ITEMS);
            if (_users) {
                console.log('Using users from local storage');
                users = _users
            }
        }
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

<TableContainer>
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
                    <td><a href={user.html_url} target={user.login}>{user.login}</a></td>
                    <td class="user-avatar">
                        <UserAvatar src={user.avatar_url} />
                    </td>
                    <td>{user.followers ? user.followers.toLocaleString("en-US") : '-'}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</TableContainer>

<style>
    .user-avatar {
        padding: 0 0 0 2em;
    }
</style>
