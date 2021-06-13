import {getLastMonth, getLastYear} from '../helpers/date';

/**
 * GitHub API search base
 */
export const API_ENDPOINT_BASE = 'https://api.github.com/search'

/**
 * To retrieve the top 5 repositories with most stars
 *
 * The query retrieves all repositories in descending order by stars
 * only limiting the top 5 records.
 */
export const API_QUERY_REPOS = API_ENDPOINT_BASE
    + '/repositories?sort=stars&order=desc&per_page=5&q=created:'
    + getLastYear();

/**
 * To retrieve the top 5 users followers during the last month.
 *
 * The query retrieves all users sorted by followers in descending
 * order limiting the top 5.
 *
 * NOTE: this auery does not have the followers count. It does contain
 * the URL of the user where the information can be retrieved.
 */
export const API_QUERY_USERS = API_ENDPOINT_BASE
    + '/users?sort=followers&order=desc&per_page=5&q=created:>'
    + getLastMonth();

/**
 * To refresh the information every 2 minutes
 */
export const REFRESH_INTERVAL = 120000;

/**
 * To restrict the size of the user avatar
 */
export const AVATAR_IMAGE_WIDTH = 48;
