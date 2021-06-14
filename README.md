## GitHub Stats ##

To keep track of repositories with the most stars during
last month and the top 5 most active users by followers
created over the last year.

## Usage ##
Loading the page will auto load the data for both sets of
stats.

## Limitations ##
The GitHub API has a limit of 10 requests per minute. Fetching
data for a user requires 6 queries; one to retrieve the users
and an additional query for each user. 

The app has a toggle to turn on a 2 minute auto refresh. 
There is a repo and a users query to the same API. This means 
that the limitation has to be split in half. Furthermore, users
can refresh the page at will. 

To hide the limitation queries will fail silently and the previous 
data will remain until the time limitation has been lifted.

The Auto Refresh toggle does not refresh the data immediately. Instead
it will only set the timer. This decision was made because it is likely
that most users would load the page (7 queries); then, if the auto refresh
is enabled another 7 queries would trigger a limitation failure.
