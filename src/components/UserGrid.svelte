<script>
    import axios from 'axios'
    import {API_QUERY_USERS, REFRESH_INTERVAL, AVATAR_IMAGE_WIDTH, NUM_ITEMS} from "../config/const";
    import {canLoadData, loadData, storeData} from "../helpers/data";

    export let refresh;

    let users = [];
    let _prev = []

    const refreshData = async () => {
        if (canLoadData('users')) {
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


