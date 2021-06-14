<script>
import RepoGrid from './components/RepoGrid.svelte';
import UserGrid from './components/UserGrid.svelte';
import {getLastMonth,getLastYear} from "./helpers/date";
import TitleWithSwitch from './components/TitleWithSwitch.svelte';

let repoRefresh = false;
let userRefresh = false;
const handleRepoSwitch = e => {
	repoRefresh = e.detail.on === true;
}

const handleUserSwitch = e => {
	userRefresh = e.detail.on === true;
}
</script>

<main class="container">

	<TitleWithSwitch on:switch={handleRepoSwitch}>
		<h2>Top 5 Repositories
			<span>(with most stars since {getLastMonth()})</span>
		</h2>
	</TitleWithSwitch>
	<RepoGrid refresh={repoRefresh}/>


	<TitleWithSwitch on:switch={handleUserSwitch}>
		<h2>Top 5 Users
			<span>(with most followers since {getLastYear()})</span>
		</h2>
	</TitleWithSwitch>
	<UserGrid refresh="{userRefresh}"/>
</main>

<style>
	h2 {
		font-size:2em;
		margin-bottom: 0;
		margin-right: 0;
	}
	h2 span {
		font-size: .6em;
		font-style: italic;
		margin: 0;
		font-weight: normal;

	}
</style>


